#!/usr/bin/env python3
import csv, json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SEEDS = ROOT / "seeds"
OUT = ROOT / "output"

def load(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))

def save_json(path, data):
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    Path(path).write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")

def norm(s):
    s = re.sub(r"\s+", " ", str(s or "")).strip()
    return s

def guess_intent(q, rules):
    s=q.lower()
    def hit(items): return any(x.lower() in s for x in items)
    if hit(rules.get("urgent",[])): return "urgent"
    if hit(rules.get("hot",[])): return "commercial"
    if hit(rules.get("diagnostic",[])): return "diagnostic"
    if hit(rules.get("informational",[])): return "informational"
    return "mixed"

def node_type(x, axes):
    s=(x or "").lower()
    for typ, keys in axes.get("node_type_keywords",{}).items():
        if any(k.lower() in s for k in keys):
            return typ
    return "general"

def add(rows, seen, query, entity_type, entity_id, entity_name, family, source, pain_node=None, pain_type=None):
    q=norm(query)
    if not q or len(q.split())>12:
        return
    key=(entity_type,entity_id,q.lower())
    if key in seen:
        return
    seen.add(key)
    rows.append({
        "query":q,
        "entity_type":entity_type,
        "entity_id":entity_id,
        "entity_name":entity_name,
        "family":family,
        "source":source,
        "pain_node":pain_node,
        "pain_type":pain_type
    })

def run():
    industries=load(SEEDS/"industries.json")["items"]
    services=load(SEEDS/"services.json")["items"]
    mind=load(SEEDS/"semantic-mindmap.json")
    axes=load(SEEDS/"advertising-axes.json")
    rules=axes["ad_intent_rules"]
    pain_map=mind.get("industry_pain_terms",{})
    material_nodes=mind.get("material_nodes",[])

    rows=[]; seen=set()

    # 1. Ready services — independent advertising direction.
    for svc in services:
        if not svc.get("enabled"): continue
        for q in svc.get("seeds",[]):
            add(rows,seen,q,"service",svc["id"],svc["name"],"SERVICE_CORE","service_seed")
        for q in list(svc.get("seeds",[])):
            for mod in axes.get("commercial_modifiers",[]):
                add(rows,seen,f"{q} {mod}","service",svc["id"],svc["name"],"SERVICE_COMMERCIAL","service_x_modifier")

    # 2. Industry direct roots.
    for ind in industries:
        if not ind.get("enabled"): continue
        name=ind["name"]
        iname=name.lower()
        for tmpl in axes.get("industry_phrases",[]):
            add(rows,seen,tmpl.replace("{industry}",iname),"industry",ind["id"],name,"INDUSTRY_DIRECT","industry_template")

        # 3. Radar/mind-map pain nodes x human language x industry.
        pains=pain_map.get(name,[])
        for x in pains:
            typ=node_type(x,axes)
            templates=axes.get("type_templates",{}).get(typ,axes.get("type_templates",{}).get("general",[]))
            for tmpl in templates:
                add(rows,seen,tmpl.replace("{x}",x),"industry",ind["id"],name,
                    "PAIN_ACTION","pain_action",x,typ)
            for tmpl in axes.get("pain_plus_industry_patterns",[]):
                add(rows,seen,tmpl.replace("{x}",x).replace("{industry}",iname),
                    "industry",ind["id"],name,"PAIN_X_INDUSTRY","pain_x_industry",x,typ)

    # 4. Material-first discovery — can later map to multiple industries/services.
    for x in material_nodes:
        typ=node_type(x,axes)
        templates=axes.get("type_templates",{}).get(typ,axes.get("type_templates",{}).get("general",[]))
        for tmpl in templates:
            add(rows,seen,tmpl.replace("{x}",x),"material",x,x,
                "MATERIAL_DISCOVERY","material_action",x,typ)

    for r in rows:
        r["intent_guess"]=guess_intent(r["query"],rules)
        r["word_count"]=len(r["query"].split())
        # lightweight routing hints; not legal conclusions
        q=r["query"].lower()
        if "нвос" in q:
            r["landing_hint"]="НВОС"
        elif "2 тп" in q or "отчетност" in q or "учет отход" in q or "журнал отход" in q:
            r["landing_hint"]="Отходы / учёт и отчётность"
        elif "паспорт" in q and "отход" in q:
            r["landing_hint"]="Паспорта отходов"
        elif any(k in q for k in ["сточн","сброс","водопольз","очистн","ливнев","скважин"]):
            r["landing_hint"]="Вода"
        elif any(k in q for k in ["выброс","ндв","инвентаризац","пыль","запах"]):
            r["landing_hint"]="Воздух"
        elif r["entity_type"]=="industry":
            r["landing_hint"]="Отраслевая карточка"
        else:
            r["landing_hint"]="Требует маршрутизации"

    rows.sort(key=lambda x:(x["entity_type"],x["entity_name"],x["family"],x["query"]))

    save_json(OUT/"generated-hypotheses.json",{
        "version":"1.0.0",
        "state":"GENERATED_FREE_MODE",
        "method":"semantic combinator",
        "count":len(rows),
        "warning":"These are hypotheses, not demand data. Validate with Wordstat/Direct.",
        "items":rows
    })

    # CSV for filtering/review
    csv_path=OUT/"generated-hypotheses.csv"
    with csv_path.open("w",encoding="utf-8-sig",newline="") as f:
        fields=["query","entity_type","entity_id","entity_name","family","pain_node","pain_type","intent_guess","landing_hint","source","word_count"]
        w=csv.DictWriter(f,fieldnames=fields)
        w.writeheader(); w.writerows(rows)

    # Free Wordstat/Commander batches: keep short roots, split industry/service.
    candidates=[r for r in rows if r["word_count"]<=7 and r["intent_guess"] in ("commercial","diagnostic","urgent")]
    by_entity={}
    for r in candidates:
        key=(r["entity_type"],r["entity_id"],r["entity_name"])
        by_entity.setdefault(key,[])
        if len(by_entity[key])<35:
            by_entity[key].append(r["query"])

    lines=[]
    for (typ,eid,name),queries in sorted(by_entity.items(), key=lambda x:(x[0][0],x[0][2])):
        lines.append(f"### {typ.upper()} | {eid} | {name}")
        lines.extend(queries)
        lines.append("")
    (OUT/"wordstat-free-batches.txt").write_text("\n".join(lines),encoding="utf-8")

    # Summary
    summary={}
    for r in rows:
        k=r["entity_type"]
        summary[k]=summary.get(k,0)+1
    save_json(OUT/"combinator-status.json",{
        "version":"1.0.0","state":"READY","total":len(rows),"by_entity_type":summary,
        "outputs":["generated-hypotheses.json","generated-hypotheses.csv","wordstat-free-batches.txt"]
    })
    print(f"Generated {len(rows)} semantic hypotheses")
    return 0

if __name__=="__main__":
    raise SystemExit(run())
