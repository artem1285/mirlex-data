# MIRLEX ECO PARSER — semantic routing decisions v8 (2026-11-03)

Scope: existing MIRLEX industries only; no new industry research. Source files (branch feature/eco-parser-marketing-v1):
- marketing/keywords/kolesnikov-industry-reviewed-v2.csv
- marketing/keywords/curated_clean_2026-11-03-v2.csv
- marketing/campaigns/manual_groups_2026-11-03.md
- marketing/landing-pages/registry.json

## Verified cross-file inconsistency

In kolesnikov-industry-reviewed-v2.csv the phrases «экологические документы для кафе» and «документы по отходам для кафе» are assigned service_id=waste_passport, despite describing wider needs than waste passports. They must NOT automatically inherit a passport-specific sales claim. This is a semantic routing problem, not a claim about legal requirements.

## Five-column method: constrained examples (hypotheses only)

| ЧТО | ДЛЯ ЧЕГО | КАКАЯ | ПРОДАЮЩАЯ ДОБАВКА | ГДЕ | Valid phrasing | Intent | Routing |
|---|---|---|---|---|---|---|---|
| паспорта отходов | для кафе | — | заказать | — | заказать паспорта отходов для кафе | commercial | waste_passport / SEARCH_WASTE_CAFE / диагностика отходов |
| документы по отходам | для кафе | — | — | — | документы по отходам для кафе | diagnostic | multi-document waste diagnostic; NOT automatic passport-only routing |
| экологические документы | для кафе | — | — | — | экологические документы для кафе | diagnostic | broad environmental diagnostic; NOT automatic passport-only routing |
| сведения об объекте НВОС | для предприятия | актуальные | стоимость актуализации | — | стоимость актуализации сведений об объекте НВОС для предприятия | commercial | nvos_registration / SEARCH_NVOS_UPDATE / проверка объекта НВОС |

No geographical modifier is added: market targeting has not been verified. Adjective column is optional; not every five-column permutation is grammatical or commercially meaningful.

## Decision rules for manual campaign handoff

1. Keep exact passport requests in SEARCH_WASTE_CAFE. Broad requests for «экологические документы» should be a separate diagnostic-intent group, pending a suitable verified landing page.
2. Requests for «документы по отходам» are broader than passport requests; do not promise a specific document before diagnostic qualification.
3. SEARCH_NVOS_REGISTRATION and SEARCH_NVOS_UPDATE remain distinct; the latter must say «актуализация сведений», not «постановка на учёт».
4. RSYA hypotheses: (a) кафе/кофейни — «Не знаете, какие экологические документы нужны кафе? Начните с диагностики ситуации»; (b) кафе/кофейни — «Нужны паспорта отходов для кафе? Уточните состав отходов перед оформлением». These are alternative intent-specific creative hypotheses, not verified audience segments.
5. No import/activation until matching live landing URL and form submission are tested. registry.json currently contains null verified_url for waste_passport and nvos_registration.

## Linguistic / semantic quality gate

Checked these four examples for grammatical agreement, clear object of service, non-invented geography, and intent-to-landing consistency. Exact normalized duplicates among the four: 0. The original reviewed and curated files are preserved untouched. No frequency, CTR, conversion likelihood, or legal compliance conclusion is asserted. A/B/C means testing order only; priority is not recomputed in this report.

## Status

This document is a routing correction proposal for manual implementation, not a claim that the existing CSV classifications have been rewritten. No legal core files or campaign settings changed. No advertising spend.
