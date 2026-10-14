#!/usr/bin/env python3
"""MIRLEX offline knowledge-contract checks. Structural only; not legal or expert-behavior validation."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

def load(path):
    return json.loads((ROOT / path).read_text(encoding="utf-8"))

def check(ok, message):
    if not ok:
        raise AssertionError(message)

def run():
    index = load("research/registry/master-index.json")
    paths = {row["path"] for row in index["registries"]}
    rop_path = "research/registry/radar-2026-10-12-rop008-customs-packaging-crosswalk.json"
    air_path = "research/registry/radar-2026-10-12-air001-marker-substances-methodology.json"
    for path in (rop_path, air_path):
        check(path in paths, "Not indexed: " + path)
        check((ROOT / path).is_file(), "Missing indexed evidence: " + path)
    check(load(rop_path)["id"] == "ROP-008", "ROP permanent ID changed")
    air = load(air_path)["cards"][0]
    check(air["id"] == "IND-AIR-001", "AIR permanent ID changed")
    check("RESEARCH_ONLY" in air["actuality_status"], "AIR methodology promoted without gate")
    method = json.dumps(air, ensure_ascii=False)
    for token in ("113.00.27-2023", "5.2.1", "85%", "10%", "ПДК", "ОБУВ"):
        check(token in method, "AIR methodology token missing: " + token)
    rop = load("engine/rules/rop/rop-core.v1.json")
    rules = [r for r in rop["rules"] if r["rule_id"] == "ENG-ROP-CUSTOMS-PACKAGING-001"]
    check(len(rules) == 1, "Missing/duplicate customs packaging rule")
    rule = rules[0]
    check(rule["status"] == "ACTIVE_FACT_FINDING", "Customs rule legal gate changed")
    check("ROP-008" in rule["radar_ids"], "Customs rule not linked to ROP-008")
    check(any("Never automatically map" in x for x in rule["checks"]), "Anti-auto-mapping guardrail missing")
    check("NO_AUTOMATED_LEGAL_DEBT_CONCLUSION" in rule["legal_mode"], "Legal conclusion guardrail missing")
    cases = load("engine/tests/rop-core-regression.v1.json")["cases"]
    ids = {x["case_id"] for x in cases}
    for name in ("ROP-T05-CUSTOMS-3H-NO-POLYMER", "ROP-T06-CUSTOMS-GROSS-NET-NOT-ROP-MASS", "ROP-T07-CUSTOMS-EAEU-VS-THIRD-COUNTRY"):
        check(name in ids, "ROP regression scenario missing: " + name)
    packages = load("engine/expert-packages.v1.json")["packages"]
    check("engine/rules/rop/rop-core.v1.json" in packages["ROP_EXPERT"]["modules"], "ROP rule module missing")
    check("engine/rules/universal/universal-gates.v1.json" in packages["ECO_EXPERT"]["modules"], "ECO universal module missing")
    knowledge_path = "engine/knowledge/ovos-pmoos-gee-2026-10-12.md"
    check(any(m.get("path") == knowledge_path and m.get("mode") == "RESEARCH_ONLY" for m in packages["ECO_EXPERT"].get("knowledge_modules", [])), "OVOS/GEE ECO knowledge reference missing")
    check(any(m.get("path") == knowledge_path and m.get("mode") == "REFERRAL_ONLY" for m in packages["ROP_EXPERT"].get("cross_contour_modules", [])), "OVOS/GEE ROP referral missing")
    knowledge = (ROOT / knowledge_path).read_text(encoding="utf-8")
    for token in ("1644", "01.03.2027", "174-ФЗ", "ПРОЕКТ", "НЕ ПРИМЕНЯЕТСЯ", "NOT_ACTIVE_EXECUTABLE_RULE"):
        check(token in knowledge, "OVOS/GEE source or legal gate missing: " + token)
    industries = load("engine/industry-registry.v1.json")
    check(industries["industry_count"] == 58 and len(industries["industries"]) == 58, "ECO PARSER 58 industries mismatch")
    print("PASS: indexed ROP-008/AIR-001; ROP customs anti-auto-map and scenarios; OVOS/GEE research-only expert routing; 58 industries")
    print("LIMIT: offline structural contract, not legal validation, model decision test, or Cloudflare deployment")

if __name__ == "__main__":
    run()
