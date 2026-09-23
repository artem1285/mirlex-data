#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
MIRLEX | build_tnved_2414_index.py

Builds a compact TN VED index only for codes actually used by PP RF No. 2414.

Input:
  rop-check.data.js  (already normalized and self-tested by build_rop_runtime.py)

Output:
  tnved-2414-index.json

Purpose:
- normalize TN VED codes independently of spaces/dashes;
- expose the parent 4-digit commodity heading;
- link each TN VED rule to concrete PP 2414 rows;
- preserve "из" and footnotes;
- support long-code -> broader-heading explanations in MIRLEX.

This is NOT a replacement for the official TN VED classifier and does not
reclassify the customer's goods. It indexes how PP 2414 itself references TN VED.
"""

import json
import re
from pathlib import Path

SRC = Path("rop-check.data.js")
OUT = Path("tnved-2414-index.json")

PREFIX = "window.MIRLEX_ROP_PAYLOAD="

def digits(v):
    return re.sub(r"\D", "", v or "")

def level_name(n):
    if n == 4:
        return "товарная позиция"
    if n == 6:
        return "субпозиция"
    if n == 10:
        return "подсубпозиция"
    return f"код уровня {n} знаков"

def load_payload():
    raw = SRC.read_text(encoding="utf-8").strip()
    if not raw.startswith(PREFIX):
        raise RuntimeError("rop-check.data.js: неожиданный формат")
    raw = raw[len(PREFIX):]
    if raw.endswith(";"):
        raw = raw[:-1]
    return json.loads(raw)

def main():
    payload = load_payload()
    data = payload.get("data", [])

    if not data:
        raise RuntimeError("rop-check.data.js: пустая база")

    index = {}

    for item in data:
        if int(item.get("section", 0)) == 3:
            continue

        for rule in item.get("tnRules", []):
            d = rule.get("codeDigits") or digits(rule.get("code", ""))
            if not d:
                continue
            if len(d) < 4 or len(d) > 10:
                raise RuntimeError(
                    f"Некорректная длина ТН ВЭД: {rule.get('code')} / {d}"
                )

            entry = index.setdefault(d, {
                "codeDigits": d,
                "displayCode": rule.get("code") or d,
                "length": len(d),
                "level": level_name(len(d)),
                "heading4": d[:4],
                "rows": []
            })

            row = {
                "section": item.get("section"),
                "group": item.get("group"),
                "name": item.get("name"),
                "okpd": item.get("okpd") or "",
                "isFrom": bool(rule.get("isFrom")),
                "footnotes": sorted(set(rule.get("footnotes") or []))
            }

            key = (
                row["section"], row["group"], row["name"], row["okpd"],
                row["isFrom"], tuple(row["footnotes"])
            )

            if not any(
                (
                    x["section"], x["group"], x["name"], x["okpd"],
                    x["isFrom"], tuple(x["footnotes"])
                ) == key
                for x in entry["rows"]
            ):
                entry["rows"].append(row)

    # Deterministic ordering
    entries = []
    for d in sorted(index.keys(), key=lambda x: (x[:4], len(x), x)):
        e = index[d]
        e["rows"].sort(
            key=lambda x: (
                int(x["group"] or 0),
                x["name"] or "",
                x["okpd"] or ""
            )
        )
        entries.append(e)

    # Hard controls
    by_code = {x["codeDigits"]: x for x in entries}

    if "8471" not in by_code:
        raise RuntimeError("Контроль 8471 не пройден")
    if not any(
        r["isFrom"] and 4 in r["footnotes"]
        for r in by_code["8471"]["rows"]
    ):
        raise RuntimeError("Контроль из 8471 <4> не пройден")

    if "6301" not in by_code:
        raise RuntimeError("Контроль 6301 не пройден")
    if not any(
        r["isFrom"] and 3 in r["footnotes"]
        for r in by_code["6301"]["rows"]
    ):
        raise RuntimeError("Контроль из 6301 <3> не пройден")

    if "8518" not in by_code:
        raise RuntimeError("Контроль 8518 не пройден")
    if not any(
        8 in r["footnotes"]
        for r in by_code["8518"]["rows"]
    ):
        raise RuntimeError("Контроль из 8518 <8> не пройден")

    out = {
        "meta": {
            "dataset": "MIRLEX TN VED index for PP RF No. 2414",
            "source": "rop-check.data.js",
            "pp2414_effective_from": payload.get("meta", {}).get("list_effective_from"),
            "uniqueCodes": len(entries),
            "note": (
                "Индекс отражает коды ТН ВЭД, используемые в ПП РФ №2414. "
                "Он не является полной ТН ВЭД ЕАЭС и не предназначен "
                "для самостоятельной переклассификации товара."
            )
        },
        "entries": entries
    }

    OUT.write_text(
        json.dumps(out, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8"
    )

    print(
        f"OK: {OUT}; uniqueCodes={len(entries)}; "
        f"bytes={OUT.stat().st_size}"
    )

if __name__ == "__main__":
    main()
