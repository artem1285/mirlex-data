#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
MIRLEX | build_rop_runtime.py

Reads rop-2414.json produced by build_rop_2414.py,
rebuilds TN VED rules safely from tnvedRaw,
runs strict integrity checks,
and writes a browser-ready JS payload:

    rop-check.data.js

The browser does NOT fetch/parse JSON at runtime.
"""

import json
import re
from pathlib import Path

SRC = Path("rop-2414.json")
OUT = Path("rop-check.data.js")
RULES = Path("rop-rule-explanations.json")

def clean(v):
    return re.sub(r"\s+", " ", (v or "").replace("\xa0", " ")).strip()

def digits(v):
    return re.sub(r"\D", "", v or "")

def parse_tn_rules(text):
    text = clean(text)
    rules = []

    # Key protection:
    # once a new 4-digit TN VED heading starts, it begins a new code,
    # not another block of the preceding code.
    pat = re.compile(
        r"(из\s+)?"
        r"(\d{4}(?:\s+(?!\d{4}\b)\d{1,3}){0,3})"
        r"(?:\s*<\s*(\d{1,2})\s*>)?",
        re.I,
    )

    seen = set()

    for m in pat.finditer(text):
        code = clean(m.group(2))
        foot = int(m.group(3)) if m.group(3) else None

        rule = {
            "code": code,
            "codeDigits": digits(code),
            "isFrom": bool(m.group(1)),
            "footnotes": [foot] if foot else [],
        }

        key = (
            rule["codeDigits"],
            rule["isFrom"],
            tuple(rule["footnotes"]),
        )

        if key not in seen:
            seen.add(key)
            rules.append(rule)

    return rules

def normalize(payload):
    data = payload["data"]

    for item in data:
        if int(item.get("section", 0)) == 3:
            continue

        raw = item.get("tnvedRaw", "")
        rules = parse_tn_rules(raw)

        if raw and not rules:
            raise RuntimeError(
                f"Не удалось разобрать ТН ВЭД: OKPD={item.get('okpd')} raw={raw!r}"
            )

        if rules:
            item["tnRules"] = rules
            item["tnvedCodes"] = [r["code"] for r in rules]
            item["isFrom"] = any(r["isFrom"] for r in rules)

    return payload

def codes_for_okpd(data, okpd):
    result = set()
    target = digits(okpd)

    for item in data:
        if digits(item.get("okpd", "")) != target:
            continue

        for rule in item.get("tnRules", []):
            result.add(rule.get("codeDigits") or digits(rule.get("code", "")))

    return result

def check(payload):
    if payload.get("meta", {}).get("integrity") != "passed":
        raise RuntimeError("Исходная база не имеет integrity=passed")

    data = payload.get("data")
    if not isinstance(data, list) or not (1000 <= len(data) <= 2500):
        raise RuntimeError(f"Нетипичный размер базы: {len(data) if isinstance(data, list) else 'n/a'}")

    groups = {int(x["group"]) for x in data}
    if groups != set(range(1, 53)):
        missing = sorted(set(range(1, 53)) - groups)
        raise RuntimeError(f"Неполный набор групп. Нет: {missing}")

    # Any TN VED longer than 10 digits means the parser merged adjacent codes.
    malformed = []

    for item in data:
        for rule in item.get("tnRules", []):
            rd = rule.get("codeDigits") or digits(rule.get("code", ""))
            if len(rd) < 4 or len(rd) > 10:
                malformed.append(
                    (item.get("okpd", ""), rule.get("code", rd))
                )

    if malformed:
        raise RuntimeError(
            "Искажённые ТН ВЭД после нормализации: " + repr(malformed[:10])
        )

    # Regression controls for cells that the old regex merged.
    regression = [
        ("13.93.19.120", {"5704", "570500"}),
        ("22.19.60.110", {"401512000", "4015190000"}),
        ("22.19.73.110", {"401610000", "4016950000"}),
        ("17.21.12.000", {"481930000", "4819400000"}),
        ("27.51.23.110", {"851631000", "8516320000"}),
    ]

    for okpd, expected in regression:
        actual = codes_for_okpd(data, okpd)
        if not expected.issubset(actual):
            raise RuntimeError(
                f"Регрессионный контроль {okpd} не пройден: "
                f"expected={sorted(expected)}, actual={sorted(actual)}"
            )

    # Existing critical control.
    ctrl = [
        x for x in data
        if int(x.get("group", 0)) == 19
        and digits(x.get("okpd", "")) == "172113000"
    ]
    if not ctrl:
        raise RuntimeError("Контроль 17.21.13.000 / группа 19 не пройден")

    if not any(
        "4819100000" in {
            r.get("codeDigits") or digits(r.get("code", ""))
            for r in x.get("tnRules", [])
        }
        for x in ctrl
    ):
        raise RuntimeError(
            "Контроль 17.21.13.000 → 4819 10 000 0 не пройден"
        )

def main():
    payload = json.loads(SRC.read_text(encoding="utf-8"))
    payload = normalize(payload)
    check(payload)

    rule_explanations = json.loads(RULES.read_text(encoding="utf-8"))
    required = {str(i) for i in range(1, 12)}
    actual = set(rule_explanations.get("footnotes", {}).keys())

    if not required.issubset(actual):
        missing = sorted(required - actual, key=int)
        raise RuntimeError(f"Нет машинных пояснений для сносок: {missing}")

    if not rule_explanations.get("from", {}).get("user_text"):
        raise RuntimeError("Нет машинного пояснения для конструкции «из»")

    if not rule_explanations.get("plain_heading", {}).get("user_text"):
        raise RuntimeError("Нет машинного пояснения для кода без «из»")

    payload["ruleExplanations"] = rule_explanations

    # Compact JS assignment. CDN/browser compression makes it small on the wire.
    js = (
        "window.MIRLEX_ROP_PAYLOAD="
        + json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
        + ";\n"
    )

    OUT.write_text(js, encoding="utf-8")

    print(
        f"OK: {OUT} written; "
        f"positions={len(payload['data'])}; "
        f"bytes={OUT.stat().st_size}"
    )

if __name__ == "__main__":
    main()
