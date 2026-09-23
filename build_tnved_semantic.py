#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
MIRLEX | build_tnved_semantic.py

Автоматически обогащает заданные полные коды ТН ВЭД:
- официальным/справочным наименованием кода;
- связанной позицией ОКПД 2, если она опубликована источником;
- URL источника;
- датой получения.

Текущий источник: публичная карточка кода Alta-Soft.
Для production можно заменить источник на лицензированный API/НСИ без изменения
формата tnved-semantic-map.json.

ВАЖНО:
- существующие записи не перезапрашиваются ежедневно;
- запись обновляется только если старше REFRESH_DAYS;
- ошибка внешнего источника НЕ ломает основную базу №2414;
- файл не используется для самостоятельной переклассификации товара.
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
    "User-Agent": "MIRLEX-data-builder/1.0 (+https://github.com/artem1285/mirlex-data)"
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
                time.sleep(1.0 * attempt)
    raise RuntimeError(f"Не удалось получить {url}: {last}")


def parse_alta(code: str, html: str) -> dict:
    soup = BeautifulSoup(html, "html.parser")
    text = "\n".join(
        line.strip()
        for line in soup.get_text("\n", strip=True).splitlines()
        if line.strip()
    )

    # Проверяем, что страница именно нужного кода.
    if code not in digits(text):
        # digits(text) слишком длинный; дополнительная простая проверка.
        if code not in text.replace(" ", ""):
            raise RuntimeError(f"Страница источника не содержит код {code}")

    # Наименование: в публичной карточке идёт сразу после блока "Код ТН ВЭД" + code.
    lines = [x.strip() for x in soup.get_text("\n", strip=True).splitlines() if x.strip()]
    name = ""
    for i, line in enumerate(lines):
        if digits(line) == code:
            # Первый разумный текст после полного кода до "Информация по..."
            for cand in lines[i + 1:i + 8]:
                if cand.lower().startswith("информация по"):
                    break
                if len(cand) > 3 and not re.fullmatch(r"[\d\s]+", cand):
                    name = cand
                    break
            if name:
                break

    # Позиция ОКПД 2: ищем строку вида XX.XX.XX после заголовка "Позиция ОКПД 2".
    okpd_code = ""
    okpd_name = ""
    okpd_anchor = None
    for i, line in enumerate(lines):
        if line.strip().lower() == "позиция окпд 2":
            okpd_anchor = i
            break

    if okpd_anchor is not None:
        for cand in lines[okpd_anchor + 1:okpd_anchor + 10]:
            m = re.match(r"^(\d{2}\.\d{2}\.\d{2}(?:\.\d{3})?)\s+(.+)$", cand)
            if m:
                okpd_code = m.group(1)
                okpd_name = m.group(2).strip()
                break

    if not name:
        raise RuntimeError(f"Не удалось извлечь наименование ТН ВЭД {code}")

    return {
        "displayCode": f"{code[:4]} {code[4:6]} {code[6:9]} {code[9:]}",
        "name": name,
        "okpdPrefixes": [okpd_code] if okpd_code else [],
        "okpdName": okpd_name,
        "source": "Alta-Soft TN VED",
        "sourceUrl": BASE_URL.format(code=code),
        "fetchedAt": iso_now()
    }


def main():
    targets = load_json(CODES, {"codes": []})
    target_codes = []
    for raw in targets.get("codes", []):
        d = digits(str(raw))
        if len(d) != 10:
            raise RuntimeError(f"Ожидался 10-значный ТН ВЭД, получено: {raw}")
        if d not in target_codes:
            target_codes.append(d)

    current = load_json(OUT, {
        "meta": {
            "dataset": "MIRLEX verified TN VED semantic mappings",
            "purpose": "Проверенный слой для сужения строк ПП РФ №2414 по полному коду ТН ВЭД.",
            "note": "Не является полной ТН ВЭД ЕАЭС и не предназначен для переклассификации товара."
        },
        "codes": {}
    })

    current.setdefault("meta", {})
    current.setdefault("codes", {})

    updated = 0
    kept = 0
    failed = []

    for idx, code in enumerate(target_codes, start=1):
        old = current["codes"].get(code)

        # Старые ручные записи без fetchedAt считаем действующими и не затираем.
        if old and (not old.get("fetchedAt") or age_days(old.get("fetchedAt")) < REFRESH_DAYS):
            kept += 1
            continue

        url = BASE_URL.format(code=code)
        try:
            html = fetch_html(url)
            entry = parse_alta(code, html)

            # Никогда не ухудшаем существующую запись: если источник временно не дал ОКПД,
            # сохраняем прежний подтверждённый префикс.
            if old and not entry["okpdPrefixes"] and old.get("okpdPrefixes"):
                entry["okpdPrefixes"] = old["okpdPrefixes"]
                entry["okpdName"] = old.get("okpdName", "")

            current["codes"][code] = entry
            updated += 1
        except Exception as e:
            failed.append({"code": code, "error": str(e)})
        finally:
            if idx < len(target_codes):
                time.sleep(REQUEST_DELAY_SEC)

    current["meta"].update({
        "updated": iso_now(),
        "targetCodeCount": len(target_codes),
        "mappedCodeCount": len(current["codes"]),
        "refreshDays": REFRESH_DAYS,
        "sourcePolicy": "public-card cache; production may switch to licensed API/NSI"
    })

    OUT.write_text(
        json.dumps(current, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )

    print(
        f"Semantic TN VED: targets={len(target_codes)}, "
        f"mapped={len(current['codes'])}, updated={updated}, kept={kept}, failed={len(failed)}"
    )

    if failed:
        print("FAILED:")
        for row in failed:
            print(f"- {row['code']}: {row['error']}")

    # Внешний справочник — дополнительный слой. Не валим весь ROP build,
    # если отдельные карточки временно недоступны.
    # Но базовые контрольные записи должны остаться.
    for control in ("8443318000", "8471300000", "8467211000", "8518900008"):
        if control not in current["codes"]:
            raise RuntimeError(f"Отсутствует контрольная semantic-запись: {control}")


if __name__ == "__main__":
    main()
