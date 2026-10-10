#!/usr/bin/env python3
"""Fail-closed read-only MIRLEX Engine integration audit. No legal approval implied."""
import json
import os
import sys
import urllib.request
import urllib.error
import traceback

BASE = os.environ.get("MIRLEX_MCP_URL", "https://yellow-tree-7185.camaction1285.workers.dev/mcp")
EXPECTED = {
    "get_radar_registry_index", "get_radar_batch", "get_radar_card",
    "get_eco_expert_package", "get_rop_expert_package", "get_mirlex_core",
    "get_rop_tests", "get_carwash_rules", "list_mirlex_industries",
    "get_industry_research", "get_industry_rulepack"
}

def rpc(method, params=None):
    body = json.dumps({"jsonrpc": "2.0", "id": 1, "method": method, "params": params or {}}).encode()
    request = urllib.request.Request(BASE, body, {"Content-Type": "application/json", "Accept": "application/json, text/event-stream", "MCP-Protocol-Version": "2025-03-26", "User-Agent": "MIRLEX-Integration-Audit/1.0 (+GitHub-Actions)"}, method="POST")
    try:
        with urllib.request.urlopen(request, timeout=25) as response:
            raw = response.read().decode()
            content_type = response.headers.get("Content-Type", "")
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")[:1200]
        raise RuntimeError(f"MCP HTTP {exc.code} method={method}: {detail}") from exc
    if "text/event-stream" in content_type or raw.lstrip().startswith("event:") or raw.lstrip().startswith("data:"):
        events = [line[5:].strip() for line in raw.splitlines() if line.startswith("data:")]
        if not events:
            raise RuntimeError(f"MCP SSE without data, method={method}: {raw[:300]}")
        data = next((event for item in events if (event := json.loads(item)).get("id") == 1), json.loads(events[-1]))
    else:
        data = json.loads(raw)
    if "error" in data:
        raise AssertionError(f"MCP error {method}: {data['error']}")
    return data["result"]

def call(name, args=None):
    result = rpc("tools/call", {"name": name, "arguments": args or {}})
    if result.get("isError"):
        raise AssertionError(f"{name} isError: {result}")
    if "structuredContent" in result:
        return result["structuredContent"]
    for block in result.get("content", []):
        if block.get("type") == "text":
            return json.loads(block["text"])
    raise AssertionError(f"No JSON response from {name}")

def require(condition, message):
    if not condition:
        raise AssertionError(message)

def run():
    names = {t["name"] for t in rpc("tools/list")["tools"]}
    require(EXPECTED <= names, f"Missing MCP tools: {sorted(EXPECTED - names)}")
    index = call("get_radar_registry_index")
    require(index.get("ok") is True, "Radar registry failed")
    require(index.get("registry", {}).get("registries"), "Radar registry has no indexed batches")
    required_path = "research/registry/radar-2026-10-09-rop004-rpn-primary-relink.json"
    require(any(row.get("path") == required_path for row in index["registry"]["registries"]), "Latest ROP-004 batch not indexed in deployed Engine")
    card = call("get_radar_card", {"id": "ROP-004"})
    require(card.get("ok") is True and card.get("complete") is True and card.get("records"), "ROP-004 incomplete or absent")
    require(any(record.get("source") == required_path and record.get("card", {}).get("id") == "ROP-004" for record in card["records"]), "Latest ROP-004 evidence not delivered by deployed Engine")
    industries = call("list_mirlex_industries")
    registry = industries.get("data", industries)
    require(registry.get("industry_count", 0) >= 58, "Industry registry regressed below 58")
    industry = call("get_industry_research", {"industry_id": "IND-002"})
    require(industry.get("ok") is True and industry.get("expert_passport"), "IND-002 research unavailable")
    for name, key in [("get_eco_expert_package", "ECO_EXPERT"), ("get_rop_expert_package", "ROP_EXPERT")]:
        package = call(name)
        require(package.get("ok") is True and package.get("expert") == key, f"{key} package failed")
        require(package.get("core", {}).get("rules"), f"{key} common core missing")
    print("PASS: 11 MCP tools, latest ROP-004 evidence, radar index, 58+ industries, IND-002 and both expert packages")
    print("LIMIT: this tests server retrieval, not actual model decisions, legal validation, or radar write pipeline")

if __name__ == "__main__":
    try:
        run()
    except Exception as exc:
        print(f"FAIL: {type(exc).__name__}: {exc}", file=sys.stderr)
        traceback.print_exc(file=sys.stderr)
        sys.exit(1)
