#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
MIRLEX | build_tnved_semantic.py v2

Обогащает полные коды ТН ВЭД:
- точным наименованием кода;
- связанной позицией ОКПД 2;
- URL источника;
- датой получения.

Исправления v2:
- наименование извлекается только из блока "Код ТН ВЭД";
- ОКПД 2 извлекается из блока "Позиция ОКПД 2";
- мусорные значения ("Техническая поддержка", навигация и т.п.) запрещены;
- свежая, но невалидная запись принудительно перезапрашивается;
- контрольные коды валидируются по ожидаемым ОКПД2;
- при ошибке контрольных данных workflow ПАДАЕТ, а не публикует плохую базу.
"""

from __future__ import annotations

import json
import re
import time
from datetime import datetime, timezone
from pathlib import Path

import requests
from bs4 import BeautifulSoup

CODES = Path("tnved-semantic-codes.json")
OUT = Path("tnved-semantic-map.json")

REFRESH_DAYS = 30
REQUEST_DELAY_SEC = 0.35
TIMEOUT_SEC = 15
MAX_RETRIES = 3

BASE_URL = "https://www.alta.ru/tnved/code/{code}/"

HEADERS = {
    "User-Agent": "MIRLEX-data-builder/2.0 (+https://github.com/artem1285/mirlex-data)"
}

BAD_NAME_MARKERS = (
    "техническая поддержка",
    "информация по коду",
    "такса онлайн",
    "пояснения к позиции",
    "классификационные решения",
    "товары и коды",
    "таможенные платежи",
    "получить информацию",
)

CONTROL_EXPECTED = {
    "9031100000": ("машины балансировочные", "28.99.39"),
    "9031803400": ("прибор", "26.51.66"),
    "9027109000": ("газо-", "26.51.53"),
    "8443318000": ("машин", "26.20.18"),
    "8471300000": ("машин", "26.20.11"),
    "8467211000": ("дрел", "28.24.11"),
}


def digits(v: str) -> str:
    return re.sub(r"\D", "", v or "")


def iso_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def load_json(path: Path, default):
    if not path.exists():
        return default
    return json.loads(path.read_text(encoding="utf-8"))


def age_days(iso_value: str | None) -> int:
    if not iso_value:
        return 10**9
    try:
        dt = datetime.fromisoformat(iso_value.replace("Z", "+00:00"))
        return (datetime.now(timezone.utc) - dt).days
    except Exception:
        return 10**9


def clean_line(v: str) -> str:
    return re.sub(r"\s+", " ", v or "").strip()


def is_bad_name(v: str) -> bool:
    s = clean_line(v).lower()
    if len(s) < 4:
        return True
    if any(x in s for x in BAD_NAME_MARKERS):
        return True
    if re.fullmatch(r"[\d\s./-]+", s):
        return True
    return False


def valid_entry(entry: dict | None) -> bool:
    if not entry:
        return False
    if is_bad_name(entry.get("name", "")):
        return False
    prefixes = entry.get("okpdPrefixes") or []
    if not prefixes:
        return False
    return all(re.fullmatch(r"\d{2}\.\d{2}\.\d{2}(?:\.\d{3})?", p or "") for p in prefixes)


def fetch_html(url: str) -> str:
    last = None
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            r = requests.get(url, headers=HEADERS, timeout=TIMEOUT_SEC)
            r.raise_for_status()
            return r.text
        except Exception as e:
            last = e
            if attempt < MAX_RETRIES:
                time.sleep(float(attempt))
    raise RuntimeError(f"Не удалось получить {url}: {last}")


def extract_lines(soup: BeautifulSoup) -> list[str]:
    return [
        clean_line(x)
        for x in soup.get_text("\n", strip=True).splitlines()
        if clean_line(x)
    ]


def extract_name(code: str, lines: list[str]) -> str:
    # Ищем именно заголовочный блок:
    # "Код ТН ВЭД" -> "9031100000" -> "Машины балансировочные..."
    for i, line in enumerate(lines):
        if line.lower() != "код тн вэд":
            continue

        for j in range(i + 1, min(i + 5, len(lines))):
            if digits(lines[j]) != code:
                continue

            for cand in lines[j + 1:min(j + 6, len(lines))]:
                c = clean_line(cand)
                if c.lower().startswith("информация по"):
                    break
                if not is_bad_name(c):
                    return c

    # Резерв: после "# Информация по товарному коду CODE" часто повторяется иерархия.
    # Но НЕ берём произвольный текст после любого вхождения кода.
    raise RuntimeError(f"Не удалось безопасно извлечь наименование ТН ВЭД {code}")


def extract_okpd(lines: list[str]) -> tuple[str, str]:
    for i, line in enumerate(lines):
        if line.lower() != "позиция окпд 2":
            continue

        window = lines[i + 1:min(i + 12, len(lines))]

        # Вариант 1: код + название в одной строке.
        for cand in window:
            m = re.match(r"^(\d{2}\.\d{2}\.\d{2}(?:\.\d{3})?)\s+(.+)$", cand)
            if m:
                return m.group(1), clean_line(m.group(2))

        # Вариант 2: код отдельной строкой, название следующей.
        for j, cand in enumerate(window):
            if re.fullmatch(r"\d{2}\.\d{2}\.\d{2}(?:\.\d{3})?", cand):
                name = ""
                if j + 1 < len(window):
                    nxt = clean_line(window[j + 1])
                    if not re.fullmatch(r"[\d\s./-]+", nxt):
                        name = nxt
                return cand, name

    raise RuntimeError("Не удалось извлечь позицию ОКПД 2")


def parse_alta(code: str, html: str) -> dict:
    soup = BeautifulSoup(html, "html.parser")
    lines = extract_lines(soup)

    name = extract_name(code, lines)
    okpd_code, okpd_name = extract_okpd(lines)

    entry = {
        "displayCode": f"{code[:4]} {code[4:6]} {code[6:9]} {code[9:]}",
        "name": name,
        "okpdPrefixes": [okpd_code],
        "okpdName": okpd_name,
        "source": "Alta-Soft TN VED",
        "sourceUrl": BASE_URL.format(code=code),
        "fetchedAt": iso_now(),
    }

    if not valid_entry(entry):
        raise RuntimeError(f"Извлечённая запись не прошла валидацию: {code}: {entry}")

    return entry


def validate_controls(codes: dict):
    errors = []

    for code, (name_marker, okpd_prefix) in CONTROL_EXPECTED.items():
        entry = codes.get(code)
        if not entry:
            errors.append(f"{code}: отсутствует")
            continue

        if name_marker.lower() not in (entry.get("name") or "").lower():
            errors.append(
                f"{code}: неверное наименование: {entry.get('name')!r}, "
                f"ожидался маркер {name_marker!r}"
            )

        if okpd_prefix not in (entry.get("okpdPrefixes") or []):
            errors.append(
                f"{code}: неверный ОКПД2: {entry.get('okpdPrefixes')}, "
                f"ожидался {okpd_prefix}"
            )

    if errors:
        raise RuntimeError("Контроль semantic TN VED не пройден:\n- " + "\n- ".join(errors))


def main():
    targets = load_json(CODES, {"codes": []})

    target_codes = []
    for raw in targets.get("codes", []):
        d = digits(str(raw))
        if len(d) != 10:
            raise RuntimeError(f"Ожидался 10-значный ТН ВЭД, получено: {raw}")
        if d not in target_codes:
            target_codes.append(d)

    current = load_json(
        OUT,
        {
            "meta": {
                "dataset": "MIRLEX verified TN VED semantic mappings",
                "purpose": "Проверенный слой для сужения строк ПП РФ №2414 по полному коду ТН ВЭД.",
                "note": "Не является полной ТН ВЭД ЕАЭС и не предназначен для переклассификации товара.",
            },
            "codes": {},
        },
    )

    current.setdefault("meta", {})
    current.setdefault("codes", {})

    updated = 0
    kept = 0
    failed = []

    for idx, code in enumerate(target_codes, start=1):
        old = current["codes"].get(code)

        # Кэшируем только ВАЛИДНЫЕ записи.
        # Мусорная запись принудительно перезапрашивается даже если она свежая.
        if old and valid_entry(old) and age_days(old.get("fetchedAt")) < REFRESH_DAYS:
            kept += 1
            continue

        # Проверенные ручные записи без fetchedAt сохраняем только если они валидны.
        if old and valid_entry(old) and not old.get("fetchedAt"):
            kept += 1
            continue

        try:
            html = fetch_html(BASE_URL.format(code=code))
            entry = parse_alta(code, html)
            current["codes"][code] = entry
            updated += 1
        except Exception as e:
            failed.append({"code": code, "error": str(e)})

            # Если старая запись невалидна — удаляем, чтобы MIRLEX её не использовал.
            if old and not valid_entry(old):
                current["codes"].pop(code, None)
        finally:
            if idx < len(target_codes):
                time.sleep(REQUEST_DELAY_SEC)

    current["meta"].update(
        {
            "updated": iso_now(),
            "targetCodeCount": len(target_codes),
            "mappedCodeCount": len(current["codes"]),
            "refreshDays": REFRESH_DAYS,
            "builderVersion": 2,
            "sourcePolicy": "validated public-card cache; production may switch to licensed API/NSI",
        }
    )

    # Жёсткий контроль ДО записи финального файла.
    validate_controls(current["codes"])

    OUT.write_text(
        json.dumps(current, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print(
        f"Semantic TN VED v2: targets={len(target_codes)}, "
        f"mapped={len(current['codes'])}, updated={updated}, "
        f"kept={kept}, failed={len(failed)}"
    )

    if failed:
        print("WARNINGS:")
        for row in failed:
            print(f"- {row['code']}: {row['error']}")


if __name__ == "__main__":
    main()
