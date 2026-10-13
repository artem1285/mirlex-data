import json
from pathlib import Path

root = Path(__file__).resolve().parents[2]
def read(path):
    return json.loads((root / path).read_text(encoding="utf-8"))
core = read("engine/rules/universal/universal-gates.v1.json")
suite = read("engine/tests/universal-factfinding-regression.v1.json")
rop = read("engine/rules/rop/rop-core.v1.json")
rules = {r["rule_id"]: r for r in core["rules"]}
assert len(rules) == len(core["rules"]), "Duplicate rule IDs"
assert any(r["rule_id"] == "ENG-ROP-CUSTOMS-PACKAGING-001" for r in rop["rules"])
for case in suite["cases"]:
    rule = rules[case["rule_id"]]
    assert rule["status"] == "ACTIVE_FACT_FINDING"
    assert "NO_AUTOMATED" in rule["legal_mode"]
    assert all(x.startswith("https://") for x in rule["source_urls"])
    assert len(rule["ask"]) == 3
    assert (root / rule["evidence_path"]).exists()
    active = any(case["input"].get(k) is True for k in rule["activation_any"])
    assert active == case["expect"]["activate"], case["id"]
    if active:
        assert case["expect"]["prohibit"] in rule["prohibited_inferences"]
        if "rop_expert" in case["expect"]:
            assert rule["expert_routing"]["ROP_EXPERT"] == case["expect"]["rop_expert"]
print("PASS: 7 universal fact-finding regression contracts; ROP baseline preserved")
print("LIMIT: static contract tests, not expert reasoning or legal validation")
