#!/usr/bin/env python3
"""
Yandex Direct search-query collector.
Enabled after advertising starts and YANDEX_DIRECT_TOKEN + YANDEX_DIRECT_LOGIN are configured.
Uses SEARCH_QUERY_PERFORMANCE_REPORT; Yandex forms this report in offline mode.
"""
import os, json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/"output"

def main():
    token=os.getenv("YANDEX_DIRECT_TOKEN","").strip()
    login=os.getenv("YANDEX_DIRECT_LOGIN","").strip()
    if not token or not login:
        print("Direct credentials are not configured; skipping live search-query import.")
        return 0
    # Deliberately kept inactive until real campaigns exist, to avoid requesting an empty report.
    # The report connector will be enabled as soon as MIRLEX Direct campaign IDs are known.
    (OUT/"direct-ready.json").write_text(json.dumps({
        "state":"READY_FOR_CAMPAIGNS",
        "report_type":"SEARCH_QUERY_PERFORMANCE_REPORT",
        "login":login
    },ensure_ascii=False,indent=2),encoding="utf-8")
    return 0

if __name__=="__main__":
    raise SystemExit(main())
