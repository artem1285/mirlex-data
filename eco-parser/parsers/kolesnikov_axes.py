"""ECO PARSER: generate only evidence-linked, human-readable query hypotheses.

The Kolesnikov combination stage is downstream of MIRLEX Engine knowledge.
No raw keyword arithmetic; every query stores a rule/radar provenance.
This module never updates the engine, radar or ROP.
"""
import json
from pathlib import Path

SNAPSHOT = Path(__file__).resolve().parents[1] / "seeds" / "engine-evidence-snapshot.json"

# Narrow editorial rendering of documented chains, not extra sector assertions.
RULE_QUERIES = {
    "ENG-CARWASH-WW-TANK-001": [
        "куда уходят стоки автомойки",
        "вывоз стоков автомойки документы",
        "накопитель сточных вод автомойки",
        "как проверить вывоз стоков автомойки",
        "куда передают стоки автомойки",
        "осадок очистных сооружений автомойки",
    ],
    "ENG-CARWASH-WATER-SOURCE-001": [
        "скважина для автомойки документы",
        "можно ли использовать скважину для автомойки",
        "водозабор автомойки из скважины",
    ],
}
RADAR_QUERIES = {
    "IND-CONSTRUCTION-002": [
        "куда вывозить строительные отходы",
        "куда передали строительный мусор документы",
        "размещение строительных отходов на грунте",
        "как подтвердить конечного получателя строительных отходов",
    ],
    "IND-CARWASH-002": [
        "протекает накопитель сточных вод автомойки",
        "переполнение накопителя стоков автомойки",
    ],
}
RADAR_TO_INDUSTRY = {
    "IND-CONSTRUCTION-002": "IND-018",
    "IND-CARWASH-002": "IND-001",
}

def build_from_engine(industry_id, snapshot=None):
    """Yield (query, family, source_id) grounded in the read-only engine export."""
    data = snapshot if snapshot is not None else json.loads(SNAPSHOT.read_text(encoding="utf-8"))
    items = {x["industry_id"]: x for x in data["industries"]}
    if industry_id not in items:
        return
    seen = set()
    industry = items[industry_id]
    for rule_id in industry.get("rule_ids", []):
        for q in RULE_QUERIES.get(rule_id, []):
            if q not in seen:
                seen.add(q)
                yield q, "ENGINE_EVIDENCE", rule_id
    for evidence in data.get("radar_evidence", []):
        radar_id = evidence["id"]
        if RADAR_TO_INDUSTRY.get(radar_id) == industry_id:
            for q in RADAR_QUERIES.get(radar_id, []):
                if q not in seen:
                    seen.add(q)
                    yield q, "RADAR_EVIDENCE_SNAPSHOT", radar_id
