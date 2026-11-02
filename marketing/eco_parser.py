#!/usr/bin/env python3
"""MIRLEX ECO PARSER: generate traceable, non-verified search hypotheses."""
import csv
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
FIELDS = ["keyword_id","phrase","normalized_phrase","industry_id","service_id","intent","source","frequency","region","landing_url","status","negative_reason","checked_at","generation_pattern","generation_parts"]

def normalize(phrase):
    return re.sub(r"\s+", " ", phrase.casefold().replace("ё", "е").strip())

def classify(phrase):
    p=normalize(phrase)
    if any(x in p for x in ["заказать","оформить","стоимость","цена","услуги"]):
        return "commercial"
    if any(x in p for x in ["как ","какие ","нужно ли","для чего","при замене"]):
        return "diagnostic"
    return "unclassified"

def phrases(item):
    """A deliberately bounded generator; questionable combinations stay hypotheses."""
    for what in item["what"]:
        yield what, "what", [what]
        for buy in item["buy"]:
            yield f"{what} {buy}", "what+buy", [what,buy]
            yield f"{buy} {what}", "buy+what", [buy,what]
        for purpose in item["purpose"]:
            yield f"{what} {purpose}", "what+purpose", [what,purpose]
            for buy in item["buy"]:
                yield f"{buy} {what} {purpose}", "buy+what+purpose", [buy,what,purpose]
        for where in item.get("where",[]):
            yield f"{what} {where}", "what+where", [what,where]

def generate(items):
    rows={}
    for item in items:
        for phrase, pattern, parts in phrases(item):
            norm=normalize(phrase)
            # Identity is contextual to the service: never erase cross-service provenance.
            key=item["service_id"]+"|"+norm
            kid="mk_"+hashlib.sha256(key.encode("utf-8")).hexdigest()[:16]
            row={"keyword_id":kid,"phrase":phrase,"normalized_phrase":norm,
                "industry_id":item["industry_id"],"service_id":item["service_id"],
                "intent":classify(phrase),"source":"mindmap:initial_dictionary",
                "frequency":"","region":"","landing_url":item.get("landing_url") or "",
                "status":"hypothesis","negative_reason":"","checked_at":"",
                "generation_pattern":pattern,"generation_parts":json.dumps(parts,ensure_ascii=False)}
            if key not in rows: rows[key]=row
    return sorted(rows.values(),key=lambda r:(r["service_id"],r["normalized_phrase"]))

def negative_overlaps(rows, negatives):
    positive=[r["normalized_phrase"] for r in rows if r["status"] in ("accepted","verified")]
    return {n:[p for p in positive if normalize(n) in p] for n in negatives
            if any(normalize(n) in p for p in positive)}

def main():
    items=json.loads((ROOT/"dictionaries/services.json").read_text(encoding="utf-8"))
    rows=generate(items)
    out=ROOT/"keywords/hypotheses.csv"
    out.parent.mkdir(parents=True,exist_ok=True)
    with out.open("w",encoding="utf-8-sig",newline="") as f:
        writer=csv.DictWriter(f,fieldnames=FIELDS)
        writer.writeheader();writer.writerows(rows)
    print(f"Generated {len(rows)} distinct service-scoped hypotheses: {out}")

if __name__=="__main__": main()
