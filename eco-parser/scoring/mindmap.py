#!/usr/bin/env python3
import json
from collections import defaultdict
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/"output"

def load(p):
    return json.loads(Path(p).read_text(encoding="utf-8"))

def save(p,d):
    Path(p).write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding="utf-8")

def run():
    p=OUT/"demand.json"
    if not p.exists():
        save(OUT/"semantic-mindmap.json",{
            "version":"1.0.0","state":"INSUFFICIENT_DATA","industries":{},"materials":{}
        })
        return

    data=load(p).get("items",{})
    industries=defaultdict(lambda: {"families":defaultdict(list),"pain_nodes":defaultdict(list),"top_queries":[]})
    materials=defaultdict(lambda: {"families":defaultdict(list),"top_queries":[]})

    for rec in data.values():
        typ=rec.get("entity_type")
        name=rec.get("entity_name")
        fam=rec.get("family","UNKNOWN")
        pain=rec.get("pain_node")
        for q in rec.get("phrases",[]):
            item={
                "query":q.get("phrase"),
                "count":q.get("count",0),
                "intent":q.get("intent"),
                "seed":rec.get("seed")
            }
            if typ=="industry":
                industries[name]["families"][fam].append(item)
                if pain:
                    industries[name]["pain_nodes"][pain].append(item)
                industries[name]["top_queries"].append(item)
            elif typ=="material":
                materials[name]["families"][fam].append(item)
                materials[name]["top_queries"].append(item)

    def pack(node):
        fams={}
        for fam,items in node["families"].items():
            uniq={}
            for x in items:
                k=(x["query"] or "").lower()
                if k and (k not in uniq or x["count"]>uniq[k]["count"]):
                    uniq[k]=x
            fams[fam]=sorted(uniq.values(),key=lambda x:x["count"],reverse=True)[:50]
        pains={}
        for pain,items in node.get("pain_nodes",{}).items():
            uniq={}
            for x in items:
                k=(x["query"] or "").lower()
                if k and (k not in uniq or x["count"]>uniq[k]["count"]):
                    uniq[k]=x
            pains[pain]=sorted(uniq.values(),key=lambda x:x["count"],reverse=True)[:50]
        uniq={}
        for x in node["top_queries"]:
            k=(x["query"] or "").lower()
            if k and (k not in uniq or x["count"]>uniq[k]["count"]):
                uniq[k]=x
        return {
            "families":fams,
            "pain_nodes":pains,
            "top_queries":sorted(uniq.values(),key=lambda x:x["count"],reverse=True)[:100]
        }

    save(OUT/"semantic-mindmap.json",{
        "version":"1.0.0",
        "state":"LIVE",
        "industries":{k:pack(v) for k,v in industries.items()},
        "materials":{k:pack(v) for k,v in materials.items()}
    })

if __name__=="__main__":
    run()
