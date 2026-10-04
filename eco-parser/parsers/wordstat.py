#!/usr/bin/env python3
import json, os, time, urllib.request, urllib.error
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output"
SEEDS = ROOT / "seeds"
BASE = "https://searchapi.api.cloud.yandex.net/v2/wordstat/topRequests"

def load(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))

def save(path, data):
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    Path(path).write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")

def classify(phrase, patterns):
    s = phrase.lower()
    def has(items): return any(x.lower() in s for x in items)
    if has(patterns["commercial_modifiers"]): return "commercial"
    if has(patterns["urgent_modifiers"]): return "urgent"
    if has(patterns["diagnostic_modifiers"]): return "diagnostic"
    if has(patterns["informational_modifiers"]): return "informational"
    return "mixed"

def request_top(api_key, folder_id, phrase, regions=None, num=100):
    payload = {
        "phrase": phrase,
        "numPhrases": str(num),
        "devices": ["DEVICE_ALL"],
        "folderId": folder_id
    }
    if regions:
        payload["regions"] = regions
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(
        BASE, data=body, method="POST",
        headers={
            "Authorization": f"Api-key {api_key}",
            "Content-Type": "application/json"
        }
    )
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read().decode("utf-8"))

def build_jobs():
    industries = load(SEEDS/"industries.json")["items"]
    services = load(SEEDS/"services.json")["items"]
    mindmap_path = SEEDS/"semantic-mindmap.json"
    mindmap = load(mindmap_path) if mindmap_path.exists() else {"query_families":[],"material_nodes":[],"industry_pain_terms":{}}
    jobs=[]

    # Tier 1 — ready MIRLEX services.
    for item in services:
        if item.get("enabled"):
            for q in item.get("seeds",[]):
                jobs.append({
                    "entity_type":"service","entity_id":item["id"],"entity_name":item["name"],
                    "seed":q,"tier":1,"family":"SERVICE"
                })

    # Tier 1 — direct industry demand.
    for item in industries:
        if item.get("enabled"):
            for q in item.get("demand_seeds",[]):
                jobs.append({
                    "entity_type":"industry","entity_id":item["id"],"entity_name":item["name"],
                    "seed":q,"tier":1,"family":"INDUSTRY_DIRECT"
                })

    # Tier 2 — industry pain mind-map.
    families=mindmap.get("query_families",[])
    pain_terms=mindmap.get("industry_pain_terms",{})
    for item in industries:
        if not item.get("enabled"):
            continue
        industry=item["name"]
        # General industry-oriented templates.
        for fam in families:
            for tmpl in fam.get("templates",[]):
                if "{industry}" in tmpl and "{x}" not in tmpl:
                    q=tmpl.replace("{industry}",industry.lower())
                    jobs.append({
                        "entity_type":"industry","entity_id":item["id"],"entity_name":industry,
                        "seed":q,"tier":2,"family":fam["id"]
                    })
        # Concrete waste/material pains specific to this industry.
        for x in pain_terms.get(industry,[]):
            for fam in families:
                for tmpl in fam.get("templates",[]):
                    if "{x}" in tmpl:
                        q=tmpl.replace("{x}",x).replace("{industry}",industry.lower())
                        jobs.append({
                            "entity_type":"industry","entity_id":item["id"],"entity_name":industry,
                            "seed":q,"tier":2,"family":fam["id"],"pain_node":x
                        })

    # Tier 2 — material-first discovery independent of industry.
    for x in mindmap.get("material_nodes",[]):
        for fam in families:
            for tmpl in fam.get("templates",[]):
                if "{x}" in tmpl and "{industry}" not in tmpl:
                    q=tmpl.replace("{x}",x)
                    jobs.append({
                        "entity_type":"material","entity_id":x,"entity_name":x,
                        "seed":q,"tier":2,"family":fam["id"],"pain_node":x
                    })

    # stable de-dup
    seen=set(); out=[]
    for j in jobs:
        key=(j["entity_type"],j["entity_id"],j["seed"].lower())
        if key not in seen:
            seen.add(key); out.append(j)
    return out

def run():
    api_key=os.getenv("YANDEX_SEARCH_API_KEY","").strip()
    folder_id=os.getenv("YANDEX_FOLDER_ID","").strip()
    regions=[x.strip() for x in os.getenv("YANDEX_WORDSTAT_REGIONS","").split(",") if x.strip()]
    batch=max(1,int(os.getenv("ECO_PARSER_BATCH","40")))

    patterns=load(SEEDS/"query-patterns.json")
    jobs=build_jobs()

    state_path=OUT/"wordstat-state.json"
    state=load(state_path) if state_path.exists() else {"cursor":0,"runs":0}
    cursor=int(state.get("cursor",0)) % max(1,len(jobs))

    result_path=OUT/"demand.json"
    existing=load(result_path) if result_path.exists() else {"version":"1.0.0","items":{}}
    existing.setdefault("items",{})

    if not api_key or not folder_id:
        save(OUT/"status.json",{
            "version":"1.0.0","state":"WAITING_FOR_WORDSTAT_CREDENTIALS",
            "live_wordstat":False,"live_direct":False,
            "required_secrets":["YANDEX_SEARCH_API_KEY","YANDEX_FOLDER_ID"],
            "jobs_total":len(jobs)
        })
        print("Wordstat credentials are not configured; parser bootstrap is healthy.")
        return 0

    processed=0; errors=[]
    for k in range(min(batch,len(jobs))):
        idx=(cursor+k)%len(jobs)
        j=jobs[idx]
        try:
            data=request_top(api_key,folder_id,j["seed"],regions or None,100)
            rows=[]
            for item in (data.get("results",[])+data.get("associations",[])):
                phrase=item.get("phrase","").strip()
                if not phrase: continue
                rows.append({
                    "phrase":phrase,
                    "count":int(item.get("count",0) or 0),
                    "intent":classify(phrase,patterns),
                    "family":j.get("family"),
                    "tier":j.get("tier"),
                    "pain_node":j.get("pain_node")
                })
            rows=sorted(rows,key=lambda x:x["count"],reverse=True)
            existing["items"][f'{j["entity_type"]}:{j["entity_id"]}:{j["seed"]}']={
                **j,
                "total_count":int(data.get("totalCount",0) or 0),
                "phrases":rows[:200],
                "updated_at":time.strftime("%Y-%m-%dT%H:%M:%SZ",time.gmtime())
            }
            processed+=1
            time.sleep(float(os.getenv("ECO_PARSER_DELAY","0.25")))
        except urllib.error.HTTPError as e:
            errors.append({"seed":j["seed"],"http":e.code})
            if e.code in (429,503):
                break
        except Exception as e:
            errors.append({"seed":j["seed"],"error":str(e)[:300]})

    new_cursor=(cursor+processed)%max(1,len(jobs))
    save(result_path,existing)
    save(state_path,{"cursor":new_cursor,"runs":int(state.get("runs",0))+1,"jobs_total":len(jobs),"last_processed":processed})
    save(OUT/"status.json",{
        "version":"1.0.0","state":"RUNNING",
        "live_wordstat":True,"live_direct":bool(os.getenv("YANDEX_DIRECT_TOKEN")),
        "jobs_total":len(jobs),"processed_this_run":processed,
        "cursor":new_cursor,"errors":errors[:20],
        "updated_at":time.strftime("%Y-%m-%dT%H:%M:%SZ",time.gmtime())
    })
    print(f"Processed {processed}/{len(jobs)} Wordstat seeds; cursor={new_cursor}")
    return 0

if __name__=="__main__":
    raise SystemExit(run())
