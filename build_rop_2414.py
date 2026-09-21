#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
MIRLEX | builder for rop-2414.json

Purpose:
- fetch the public text copy of Government Resolution No. 2414 from Alta-Soft;
- parse the CURRENT list effective from 2025-01-01;
- preserve code-level footnotes for TN VED rules where possible;
- verify groups 1-52 and critical control cases;
- write rop-2414.json only if all integrity checks pass.

Legal source:
https://publication.pravo.gov.ru/document/0001202312310011

Machine-readable public copy used for extraction:
https://www.alta.ru/tamdoc/23ps2414/
"""

import json
import re
import sys
import time
from pathlib import Path

import requests
from bs4 import BeautifulSoup

SOURCE_URL = "https://www.alta.ru/tamdoc/23ps2414/"
OFFICIAL_URL = "https://publication.pravo.gov.ru/document/0001202312310011"
OUT = Path("rop-2414.json")

GROUPS = {
    1: {"name":"Одежда и изделия текстильные","type":"product","norms":{"2026":30,"2027":40,"2028":50,"2029":60}},
    2: {"name":"Изделия из бумаги и издательская продукция печатная","type":"product","norms":{"2026":40,"2027":50,"2028":60,"2029":70}},
    3: {"name":"Изделия из картона","type":"product","norms":{"2026":40,"2027":50,"2028":60,"2029":70}},
    4: {"name":"Нефтепродукты","type":"product","norms":{"2026":40,"2027":45,"2028":50,"2029":55}},
    5: {"name":"Шины, покрышки, камеры резиновые и изделия из резины прочие","type":"product","norms":{"2026":50,"2027":60,"2028":70,"2029":80}},
    6: {"name":"Трубы, трубки, шланги, ленты конвейерные, бельтинг из вулканизированной резины","type":"product","norms":{"2026":30,"2027":40,"2028":50,"2029":60}},
    7: {"name":"Изделия пластмассовые прочие","type":"product","norms":{"2026":35,"2027":45,"2028":55,"2029":65}},
    8: {"name":"Зеркала стеклянные","type":"product","norms":{"2026":30,"2027":40,"2028":50,"2029":60}},
    9: {"name":"Стекло и изделия из стекла","type":"product","norms":{"2026":20,"2027":30,"2028":40,"2029":50}},
    10: {"name":"Оборудование и инструменты ручные с механизированным приводом","type":"product","norms":{"2026":35,"2027":45,"2028":55,"2029":65}},
    11: {"name":"Элементы первичные и батареи первичных элементов","type":"product","norms":{"2026":40,"2027":50,"2028":60,"2029":70}},
    12: {"name":"Аккумуляторы свинцовые","type":"product","norms":{"2026":40,"2027":50,"2028":60,"2029":70}},
    13: {"name":"Батареи аккумуляторные","type":"product","norms":{"2026":40,"2027":50,"2028":60,"2029":70}},
    14: {"name":"Оборудование электрическое осветительное","type":"product","norms":{"2026":35,"2027":45,"2028":55,"2029":65}},
    15: {"name":"Фильтры для двигателей внутреннего сгорания","type":"product","norms":{"2026":35,"2027":45,"2028":55,"2029":65}},
    16: {"name":"Изделия пластмассовые строительные","type":"product","norms":{"2026":20,"2027":30,"2028":40,"2029":50}},
}
for n, name in {
    17:"Тара деревянная",18:"Тара и изделия упаковочные бумажные",19:"Тара и изделия упаковочные картонные",
    20:"Изделия пластмассовые упаковочные из полиэтилентерефталата бесцветные и голубые",
    21:"Изделия пластмассовые упаковочные из полиэтилентерефталата прочие, включая комбинированные",
    22:"Изделия пластмассовые упаковочные из полиэтилена высокой плотности",
    23:"Изделия пластмассовые упаковочные из поливинилхлорида",
    24:"Изделия пластмассовые упаковочные из полиэтилена низкой плотности",
    25:"Изделия пластмассовые упаковочные из полипропилена",
    26:"Изделия пластмассовые упаковочные из полистирола",
    27:"Изделия пластмассовые упаковочные из прочих материалов",
    28:"Изделия упаковочные из текстиля",29:"Тара и изделия упаковочные из стекла",
    30:"Тара и изделия упаковочные на основе стекла прочие",31:"Тара и изделия упаковочные из металла",
    32:"Тара и изделия упаковочные из комбинированных материалов на основе бумаги",
    33:"Упаковка из полиэтилентерефталата бесцветная и голубая",
    34:"Упаковка из полиэтилентерефталата прочая, включая комбинированную",
    35:"Упаковка из полиэтилена высокой плотности",36:"Упаковка из поливинилхлорида",
    37:"Упаковка из полиэтилена низкой плотности",38:"Упаковка из полипропилена",
    39:"Упаковка из полистирола",40:"Упаковка из других видов пластмасс",
    41:"Упаковка комбинированная из пластмасс и алюминия",
    42:"Упаковка комбинированная из пластмасс и белой жести",
    43:"Упаковка комбинированная из пластмасс и различных металлов",
    44:"Упаковка комбинированная из других видов пластмасс",
    45:"Упаковка из бумаги",46:"Упаковка из картона",47:"Металлическая упаковка",
    48:"Деревянная упаковка",49:"Текстильная упаковка",50:"Стеклянная упаковка",
    51:"Стеклянная упаковка прочая",52:"Комбинированная упаковка на основе бумаги",
}.items():
    GROUPS[n] = {"name": name, "type": "packaging" if n <= 32 else "import_packaging"}

PACK_NORMS = {"2026":75,"2027":100,"2028":100,"2029":100}

FOOTNOTES = {
    1:"Наименования товаров и упаковки приводятся по ОКПД 2. Принадлежность к перечню определяется по наименованию и физическим и химическим характеристикам по ОКПД 2. Коды и наименования ТН ВЭД ЕАЭС приведены для использования импортёрами.",
    2:"Если код товарной позиции ТН ВЭД ЕАЭС указан без примечаний, включаются все входящие субпозиции и подсубпозиции.",
    3:"За исключением одеял электрических.",
    4:"Только товары, указанные в графе «Наименование товара, упаковки».",
    5:"За исключением производственных и профессиональных.",
    6:"Без покрытия и пропитки.",
    7:"Только товары товарных субпозиций 8443 31, 8443 32 и 8443 39.",
    8:"За исключением товаров подсубпозиции 8518 90 000.",
    9:"Все товары, за исключением частей и принадлежностей.",
    10:"Раздел III используется импортёрами в отношении упаковки ввезённого товара независимо от включения самого товара в перечень.",
    11:"Буквенное обозначение и цифровой код упаковки по ТР ТС 005/2011 применяются справочно для идентификации.",
}

def clean(v):
    return re.sub(r"\s+", " ", (v or "").replace("\xa0", " ")).strip()

def digits(v):
    return re.sub(r"\D", "", v or "")

def section_name(group):
    if group <= 16:
        return "Раздел I — товары"
    if group <= 32:
        return "Раздел II — упаковка"
    return "Раздел III — ввезённая упаковка"

def extract_footnotes(text):
    return sorted(set(int(x) for x in re.findall(r"<\s*(\d{1,2})\s*>", text or "")))

def parse_tn_rules(text):
    text = clean(text)
    rules = []
    pat = re.compile(r"(из\s+)?(\d{4}(?:\s+\d{1,3}){0,3})(?:\s*<\s*(\d{1,2})\s*>)?", re.I)
    for m in pat.finditer(text):
        code = clean(m.group(2))
        foot = int(m.group(3)) if m.group(3) else None
        rules.append({
            "code": code,
            "codeDigits": digits(code),
            "isFrom": bool(m.group(1)),
            "footnotes": [foot] if foot else []
        })
    # dedupe
    seen, out = set(), []
    for r in rules:
        key = (r["codeDigits"], r["isFrom"], tuple(r["footnotes"]))
        if key not in seen:
            seen.add(key)
            out.append(r)
    return out

def parse_code_range(text):
    m = re.fullmatch(r"0?(\d{1,2})\s*[-–]\s*0?(\d{1,2})", clean(text))
    return [int(m.group(1)), int(m.group(2))] if m else None

def split_or(text):
    parts = re.split(r"\s+или\s+|[,;/]", clean(text), flags=re.I)
    return sorted(set(p.strip() for p in parts if p.strip() and p.strip() != "-"))

def text_of(cell):
    return clean(cell.get_text(" ", strip=True))

def parse_goods_packaging_table(table):
    out, group, last = [], None, None
    for tr in table.find_all("tr"):
        cells = tr.find_all(["th","td"])
        all_text = text_of(tr)
        if not all_text:
            continue

        gm = re.search(r"Группа\s+N\s*(\d{1,2})", all_text, re.I)
        if gm:
            g = int(gm.group(1))
            if 1 <= g <= 32:
                group, last = g, None
            continue
        if not group or group > 32:
            continue

        vals = [text_of(c) for c in cells]
        name = vals[0] if len(vals) >= 1 else ""
        okpd = vals[1] if len(vals) >= 2 else ""
        tn_raw = vals[2] if len(vals) >= 3 else ""

        okpd_looks = bool(re.match(r"^\d{2}\.\d{2}(?:\.\d{1,3})?(?:\.\d{1,3})?", okpd))
        if name and okpd_looks:
            rules = parse_tn_rules(tn_raw)
            item = {
                "section": 1 if group <= 16 else 2,
                "sectionName": section_name(group),
                "group": group,
                "name": name,
                "okpd": clean(okpd),
                "tnvedCodes": [r["code"] for r in rules],
                "tnvedRaw": tn_raw,
                "tnRules": rules,
                "isFrom": any(r["isFrom"] for r in rules),
                "rowFootnotes": extract_footnotes(all_text),
            }
            out.append(item)
            last = item
            continue

        # Continuation rows with additional TN VED codes
        if last and cells:
            candidate = vals[2] if len(vals) >= 3 else vals[0]
            more = parse_tn_rules(candidate)
            if more:
                existing = {(r["codeDigits"], r["isFrom"], tuple(r["footnotes"])) for r in last["tnRules"]}
                for r in more:
                    key = (r["codeDigits"], r["isFrom"], tuple(r["footnotes"]))
                    if key not in existing:
                        last["tnRules"].append(r)
                        existing.add(key)
                last["tnvedCodes"] = [r["code"] for r in last["tnRules"]]
                last["isFrom"] = any(r["isFrom"] for r in last["tnRules"])
                last["tnvedRaw"] = clean(" ; ".join(x for x in [last["tnvedRaw"], candidate] if x))
                last["rowFootnotes"] = sorted(set(last["rowFootnotes"] + extract_footnotes(all_text)))
    return out

def parse_import_table(table):
    out, group, last = [], None, None
    for tr in table.find_all("tr"):
        cells = tr.find_all(["th","td"])
        all_text = text_of(tr)
        if not all_text:
            continue

        gm = re.search(r"Группа\s+N\s*(\d{1,2})", all_text, re.I)
        if gm:
            g = int(gm.group(1))
            if 33 <= g <= 52:
                group, last = g, None
            continue
        if not group or group < 33:
            continue

        vals = [text_of(c) for c in cells]
        if len(vals) >= 3 and vals[0] and not re.search(r"Материал упаковки", vals[0], re.I):
            material, marking, numeric = vals[0], vals[1], vals[2]
            item = {
                "section": 3,
                "sectionName": section_name(group),
                "group": group,
                "name": material,
                "material": material,
                "markings": split_or(marking),
                "packagingCodes": [],
                "packagingRanges": [],
                "rowFootnotes": [10,11],
            }
            for p in re.split(r"\s+или\s+|[,;]", clean(numeric), flags=re.I):
                p = clean(p)
                if not p:
                    continue
                r = parse_code_range(p)
                if r:
                    item["packagingRanges"].append(r)
                elif re.fullmatch(r"\d{1,2}", p):
                    item["packagingCodes"].append(str(int(p)))
            item["packagingCodes"] = sorted(set(item["packagingCodes"]), key=lambda x:int(x))
            out.append(item)
            last = item
            continue

        if last:
            r = parse_code_range(all_text)
            if r:
                last["packagingRanges"].append(r)
    return out

def parse_current_list(html):
    soup = BeautifulSoup(html, "html.parser")
    tables = soup.find_all("table")
    goods_candidates, import_candidates = [], []

    for table in tables:
        tx = text_of(table)
        if (re.search(r"Группа\s+N\s*1\b", tx, re.I) and
            re.search(r"Группа\s+N\s*16\b", tx, re.I) and
            re.search(r"Группа\s+N\s*17\b", tx, re.I)):
            parsed = parse_goods_packaging_table(table)
            if len(parsed) > 30:
                goods_candidates.append(parsed)

        if (re.search(r"Группа\s+N\s*33\b", tx, re.I) and
            re.search(r"Группа\s+N\s*52\b", tx, re.I) and
            re.search(r"\bPET\b", tx, re.I)):
            parsed = parse_import_table(table)
            if len(parsed) >= 20:
                import_candidates.append(parsed)

    if not goods_candidates:
        raise RuntimeError("Не найдена таблица разделов I–II.")
    if not import_candidates:
        raise RuntimeError("Не найдена таблица раздела III.")

    # Alta page contains a 2024 list and the list effective from 2025-01-01.
    # The current list is the LAST complete occurrence.
    data = goods_candidates[-1] + import_candidates[-1]

    groups = {x["group"] for x in data}
    missing = [g for g in range(1,53) if g not in groups]
    if missing:
        raise RuntimeError(f"Нет групп: {missing}")
    if not (1000 <= len(data) <= 2500):
        raise RuntimeError(f"Нетипичный размер базы: {len(data)}")
    return data

def relation_score(q, r):
    if not q or not r:
        return 0
    if q == r:
        return 100
    if q.startswith(r):
        return 88
    if r.startswith(q):
        return 78
    return 0

def hard_rule(rule, q):
    f = rule.get("footnotes", [])
    if 3 in f and q.startswith("6301100000"):
        return "excluded"
    if 7 in f and len(q) > 4:
        return "allowed" if q.startswith(("844331","844332","844339")) else "excluded"
    if 8 in f and q.startswith("851890000"):
        return "excluded"
    return "neutral"

def tn_candidates(data, qtext):
    q = digits(qtext)
    hits = []
    for item in data:
        for rule in item.get("tnRules", []):
            rd = rule.get("codeDigits") or digits(rule.get("code",""))
            sc = relation_score(q, rd)
            if not sc:
                continue
            if hard_rule(rule, q) == "excluded":
                continue
            hits.append((sc, item, rule))
    hits.sort(key=lambda x:(-x[0], x[1]["group"], x[1]["name"]))
    return hits

def self_test(data):
    errors = []
    groups = {x["group"] for x in data}
    if groups != set(range(1,53)):
        errors.append("Набор групп 1–52 неполный")

    if not any(x["group"] == 19 and digits(x.get("okpd","")) == "172113000" for x in data):
        errors.append("17.21.13.000 / группа 19 не найден")

    if not any(x["group"] == 38 and "PP" in [m.upper() for m in x.get("markings",[])]
               and ("5" in x.get("packagingCodes",[]) or any(a <= 5 <= b for a,b in x.get("packagingRanges",[])))
               for x in data):
        errors.append("PP / 05 / группа 38 не пройден")

    if not any(x["group"] == 50 and ("70" in x.get("packagingCodes",[]) or
               any(a <= 70 <= b for a,b in x.get("packagingRanges",[]))) for x in data):
        errors.append("70 / группа 50 не пройден")

    h6301 = tn_candidates(data, "6301")
    if not any(item["group"] == 1 for _,item,_ in h6301):
        errors.append("6301 / группа 1 отсутствует")
    if not any(item["group"] == 10 and "электр" in item["name"].lower() for _,item,_ in h6301):
        errors.append("6301 / электрическое одеяло группы 10 отсутствует")

    h630110 = tn_candidates(data, "6301 10 000 0")
    if any(item["group"] == 1 for _,item,_ in h630110):
        errors.append("6301 10 000 0 ошибочно оставляет группу 1")
    if not any(item["group"] == 10 and "электр" in item["name"].lower() for _,item,_ in h630110):
        errors.append("6301 10 000 0 не находит электрическое одеяло группы 10")

    h844331 = tn_candidates(data, "8443 31")
    if not h844331:
        errors.append("8443 31 не найден")

    h8518 = tn_candidates(data, "8518 90 000")
    # No direct confirmed auto-assignment should be possible for amplifier-like conditional rows.
    # Here we only verify source rules include conditions / exclusions where relevant.
    for _, item, rule in h8518:
        if item["group"] == 10 and "усилител" in item["name"].lower():
            if not (rule.get("isFrom") or any(f in rule.get("footnotes",[]) for f in (4,8))):
                errors.append("8518 90 000: условная строка усилителя потеряла ограничение")

    if errors:
        raise RuntimeError("SELF-TEST FAILED:\n- " + "\n- ".join(errors))

def main():
    headers = {
        "User-Agent": "MIRLEX-ROP-builder/1.0 (+https://artem1285.github.io/mirlex-data/)"
    }
    r = requests.get(SOURCE_URL, headers=headers, timeout=45)
    r.raise_for_status()
    html = r.text

    if "Постановление" not in html or "2414" not in html or "Группа N 52" not in html:
        raise RuntimeError("Источник вернул неожиданный документ.")

    data = parse_current_list(html)
    self_test(data)

    payload = {
        "meta": {
            "dataset": "MIRLEX ROP check / PP RF No. 2414",
            "resolution": "Постановление Правительства РФ от 29.12.2023 №2414",
            "list_effective_from": "2025-01-01",
            "official_source": OFFICIAL_URL,
            "extraction_source": SOURCE_URL,
            "generated_unix": int(time.time()),
            "positions": len(data),
            "groups_present": sorted({x["group"] for x in data}),
            "integrity": "passed",
            "packaging_rule": {
                "2026": 75,
                "2027": 100,
                "2028": 100,
                "2029": 100
            },
            "note": "Для товаров групп 1–16 нормативы 2026–2029 хранятся в groups. Для упаковки 2026–2029 используется отдельное законодательное правило; 100% с 2027 не обозначается как норматив ПП №2414."
        },
        "groups": {str(k): v for k,v in GROUPS.items()},
        "footnotes": {str(k): v for k,v in FOOTNOTES.items()},
        "data": data
    }

    OUT.write_text(json.dumps(payload, ensure_ascii=False, separators=(",",":")), encoding="utf-8")
    print(f"OK: {OUT} written, positions={len(data)}")

if __name__ == "__main__":
    main()
