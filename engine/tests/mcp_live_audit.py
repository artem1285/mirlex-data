#!/usr/bin/env python3
"""Fail-closed read-only MIRLEX Engine integration audit. No legal approval implied."""
import json
import os
import sys
import urllib.request

BASE = os.environ.get("MIRLEX_MCP_URL", "https://yellow-tree-7185.camaction1285.workers.dev/mcp")
EXPECTED = {
    "get_radar_registry_index", "get_radar_batch", "get_radar_card",
    "get_eco_expert_package", "get_rop_expert_package", "get_mirlex_core",
    "get_rop_tests", "get_carwash_rules", "list_mirlex_industries",
    "get_industry_research", "get_industry_rulepack"
}

def rpc(method, params=None):
    body = json.dumps({"jsonrpc": "2.0", "id": 1, "method": method, "params": params or {}}).encode()
    request = urllib.request.Request(BASE, body, {"Content-Type": "application/json", "Accept": "application/json"}, method="POST")
    with urllib.request.urlopen(request, timeout=25) as response:
        raw = response.read().decode()
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
    require(index.get("data", {}).get("registries"), "Radar registry has no indexed batches")
    card = call("get_radar_card", {"id": "ROP-004"})
    require(card.get("ok") is True and card.get("complete") is True and card.get("records"), "ROP-004 incomplete or absent")
    industries = call("list_mirlex_industries")
    registry = industries.get("data", industries)
    require(registry.get("industry_count", 0) >= 58, "Industry registry regressed below 58")
    industry = call("get_industry_research", {"industry_id": "IND-002"})
    require(industry.get("ok") is True and industry.get("expert_passport"), "IND-002 research unavailable")
    for name, key in [("get_eco_expert_package", "ECO_EXPERT"), ("get_rop_expert_package", "ROP_EXPERT")]:
        package = call(name)
        require(package.get("ok") is True and package.get("expert") == key, f"{key} package failed")
        require(package.get("core", {}).get("rules"), f"{key} common core missing")
    print("PASS: 11 MCP tools, radar index, ROP-004, 58+ industries, IND-002 and both expert packages")
    print("LIMIT: this tests server retrieval, not actual model decisions, legal validation, or radar write pipeline")

if __name__ == "__main__":
    try:
        run()
    except Exception as exc:
        print(f"FAIL: {exc}", file=sys.stderr)
        sys.exit(1)
