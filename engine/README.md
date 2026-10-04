# MIRLEX Environmental Reasoning Engine

Status: MVP_CORE_V1
Created: 2026-10-04

## Purpose

The Engine converts the MIRLEX radar/registry into executable expert logic for client intake, internal diagnostics, scoping and commercial proposal preparation.

The radar remains the evidence/knowledge source of truth. Engine rules reference permanent radar IDs and never replace them.

## Core pipeline

CLIENT FACTS + DOCUMENTS
→ TRIGGERS
→ ACTIVE RULES
→ QUESTIONS / EVIDENCE REQUESTS
→ CHECKS
→ CONTRADICTIONS / UNKNOWNS / RED FLAGS
→ OBLIGATIONS / RISKS
→ CORRECTIVE ACTIONS
→ MIRLEX SERVICES
→ SCOPE INPUTS FOR QUOTATION

## Rule principles

1. Never infer a fact that the client did not provide or a document did not establish.
2. UNKNOWN is a first-class state and may trigger a follow-up question.
3. A client answer may activate multiple linked rules.
4. Physical flow must be traced to its actual endpoint.
5. A document does not by itself prove the factual process it describes.
6. Cross-contour links are mandatory: water, air, waste, soil, land, sanitary/population impact, accidents and other applicable contours.
7. Each material conclusion must retain provenance to radar IDs and/or current primary sources.
8. New client cases do not silently rewrite rules. Novel patterns enter a review queue and become active only after validation.
9. Every rule is versioned. Breaking changes require regression tests.
10. Client-facing forms expose questions, not internal radar logic.

## Learning loop

CASE → unexpected fact/contradiction → NEW_PATTERN_CANDIDATE → research/validation → radar permanent ID → reviewed Engine rule → regression test → release.

## Storage roles

- research/registry/: evidence and permanent knowledge records.
- engine/schema/: machine-readable rule contracts.
- engine/rules/: executable expert rules by industry/universal contour.
- engine/tests/: regression cases.
- future operational DB: client answers, project state and run results. Client documents and personal/business data must not be committed to this repository.

## Initial implementation

The first seed is CARWASH because it already has a strong radar chain and can validate the architecture before mass conversion of all industries.
