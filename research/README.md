# MIRLEX Research Registry

## Purpose
This directory is the persistent external knowledge base for MIRLEX research. Chat messages are not considered durable storage.

## Preservation rule
A substantive finding is complete only after it has:
1. a permanent ID;
2. a standardized registry card;
3. a preserved source trail;
4. a status showing whether current-law revalidation has been completed.

Repeated evidence does not create a new ID. It is added to the existing finding.

## Standard card fields
- ID
- date
- industry / contour
- actuality status
- primary source
- current NPA
- factual pattern
- risk
- evidence / court or supervisory practice
- what MIRLEX checks
- impact on site / Assistant / services
- RED FLAG
- exact update required

## Statuses
- VERIFIED_CURRENT — rechecked against current primary sources and current law.
- CURRENT_WITH_CHANGES — current, but implementation/wording changed.
- HISTORICAL_PATTERN_LAW_CHANGED — useful factual pattern; old legal rule not carried forward.
- NOT_APPLICABLE_NOW — not used as a current obligation.
- ARCHIVED_REVALIDATION_REQUIRED — preserved from earlier chat; do not publish or automate as current law until rechecked.

## Imported source 01
Source archive:
`research/archive/2026-09-30-chat-01-progon-proizvodstv.txt`

Integrity check after upload:
- 90,015 UTF-8 characters
- 1,414 rendered lines
- GitHub read-back successful

Structured extraction:
`research/registry/legacy-chat-01.json`

The structured extraction contains 15 permanent findings recovered from the first hard-radar chat. Where the original chat did not preserve a primary-source URL or current-law verification, the card is deliberately marked `ARCHIVED — REVALIDATION REQUIRED`. Preservation and legal validation are separate operations.

## Existing ROP IDs
ROP-001 — interagency cross-check: FTS + Minpromtorg + CRPT + FNS.
ROP-002 — Chestny ZNAK / GIS MT as a source for identifying potentially obligated entities.
ROP-003 — contract manufacturing: risk of incorrectly identifying the producer/obligated entity.
ROP-004 — recycler registry: verify recycler, operation, group and evidence, not only the contract.
ROP-005 — an act alone is insufficient; factual recycling must be supported.

Later ROP IDs must remain stable and must not be renumbered.

## Architecture
Tilda = interface.
GitHub = versioned data, research registry, JSON/rules, scripts and tests.

Future target:
```
research/
  README.md
  archive/
  registry/
  sources/
  rules/
  industries/
```

Never delete an archived source merely because a structured card is created from it.
