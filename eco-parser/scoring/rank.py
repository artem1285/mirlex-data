#!/usr/bin/env python3
import json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/"output"
SEEDS=ROOT/"seeds"

def load(p):
    return json.loads(Path(p).read_text(encoding="utf-8"))

def save(p,d):
    Path(p).write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding="utf-8")

def summarize(records):
    total=sum(r.get("total_count",0) for r in records)
    phrases=[]
    for r in records:
        phrases.extend(r.get("phrases",[]))
    # phrase-level de-dup by max count
    best={}
    for p in phrases:
        key=p["phrase"].lower()
        if key not in best or p["count"]>best[key]["count"]:
            best[key]=p
    uniq=list(best.values())
    by_intent={}
    for p in uniq:
        by_intent[p["intent"]]=by_intent.get(p["intent"],0)+p["count"]
    commercial=by_intent.get("commercial",0)+by_intent.get("urgent",0)
    diagnostic=by_intent.get("diagnostic",0)
    informational=by_intent.get("informational",0)
    denom=max(1,sum(by_intent.values()))
    return {
        "seed_total_count":total,
        "unique_phrases":len(uniq),
        "commercial_share":round(commercial/denom,4),
        "diagnostic_share":round(diagnostic/denom,4),
        "informational_share":round(informational/denom,4),
        "top_phrases":sorted(uniq,key=lambda x:x["count"],reverse=True)[:30]
    }

def run():
    if not (OUT/"demand.json").exists():
        save(OUT/"ranking.json",{"version":"1.0.0","state":"INSUFFICIENT_DATA","items":[]})
        return
    demand=load(OUT/"demand.json").get("items",{})
    industries=load(SEEDS/"industries.json")["items"]
    services=load(SEEDS/"services.json")["items"]
    rows=[]
    for typ,entities in [("service",services),("industry",industries)]:
        for e in entities:
            rec=[v for v in demand.values() if v.get("entity_type")==typ and v.get("entity_id")==e["id"]]
            if not rec:
                rows.append({"entity_type":typ,"entity_id":e["id"],"name":e["name"],"state":"INSUFFICIENT_DATA"})
                continue
            s=summarize(rec)
            # Demand score only. Final A/B/C/D is intentionally NOT emitted until other evidence modules are populated.
            score=min(100, round(
                min(55, 12 * (max(0,s["seed_total_count"]) ** 0.20)) +
                30*s["commercial_share"] +
                15*s["diagnostic_share"]
            ))
            rows.append({
                "entity_type":typ,"entity_id":e["id"],"name":e["name"],
                "state":"DEMAND_ONLY","demand_score":score,**s
            })
    rows.sort(key=lambda x:(x.get("state")!="DEMAND_ONLY",-x.get("demand_score",0),x["name"]))
    save(OUT/"ranking.json",{
        "version":"1.0.0",
        "state":"DEMAND_ONLY",
        "warning":"This is not the final MIRLEX A/B/C/D commercial ranking. It contains Wordstat demand only.",
        "items":rows
    })

if __name__=="__main__":
    run()
