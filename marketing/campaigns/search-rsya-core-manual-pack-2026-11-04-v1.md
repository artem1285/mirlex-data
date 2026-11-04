# MIRLEX ECO PARSER — ядро для ручной настройки Поиска и РСЯ (2026-11-04, v1)

## Provenance and scope
Read on branch `feature/eco-parser-marketing-v1`:
- `marketing/keywords/curated_clean_2026-11-03-v2.csv`, blob `b240c275f5f1766f52ef4cd735ba447cde197eda`;
- `marketing/keywords/nvos-update-curated-routing-2026-11-04-v1.csv`, blob `d2703cf5abb3306a301fd2acdaf371e7ce119ecd`;
- `marketing/keywords/kolesnikov-industry-reviewed-v2.csv`, blob `2b834ada3042747c318d433a5e6226120a920a22`;
- `marketing/campaigns/manual_groups_2026-11-03.md`, blob `731c34b53a0037ea57b65b8875a32bae7b82aee4`;
- `marketing/landing-pages/registry.json`, blob `3d5ec544b65af8643f009a94e3961292a466390d`.

Existing eight curated search phrases are reused verbatim; no synthetic geographic or volume claims. Raw files remain separate and untouched. Five columns: ЧТО / ДЛЯ ЧЕГО / КАКАЯ / ПРОДАЮЩАЯ ДОБАВКА / ГДЕ; empty cells mean optional modifier, not missing research.

## Search — four manual groups (not uploaded)
| Group | IDs and exact source phrases | ЧТО | ДЛЯ ЧЕГО | КАКАЯ | ДОБАВКА | ГДЕ | Intent / industry / service | Diagnostic | Priority |
|---|---|---|---|---|---|---|---|---|---|
| SEARCH_WASTE_PASSPORT | r01 «заказать паспорта отходов I–IV классов опасности для предприятия»; r03 «оформить паспорт отходов для производства» | паспорта отходов | для предприятия / для производства | I–IV классов опасности (r01) | заказать / оформить | — | commercial / cross_industry / waste_passport | диагностика отходов | A |
| SEARCH_WASTE_CAFE | r02 «стоимость паспортизации отходов для кофейни»; r07 «заказать паспорт отходов для кафе» | паспортизация отходов / паспорт отходов | для кофейни / для кафе | — | стоимость / заказать | — | commercial / cafe / waste_passport | диагностика отходов кафе | B |
| SEARCH_NVOS_REGISTRATION | r04 «заказать постановку объекта НВОС на учёт для предприятия»; r06 «оформить заявку на учёт объекта НВОС при вводе в эксплуатацию»; r08 «стоимость постановки объекта НВОС на учёт для предприятия» | постановка / заявка на учёт объекта НВОС | для предприятия / при вводе в эксплуатацию | — | заказать / оформить / стоимость | — | commercial / cross_industry / nvos_registration | проверка необходимости первичного учёта объекта | A (r04,r08), B (r06) |
| SEARCH_NVOS_UPDATE | r05 «стоимость актуализации сведений об объекте НВОС для предприятия» | актуализация сведений об объекте НВОС | для предприятия | — | стоимость | — | commercial_price / cross_industry / nvos_update (corrected overlay) | диагностика изменения сведений уже учтённого объекта | A |

Validation: all eight phrases read from source; no exact duplicate after case/space normalization among eight. Russian agreement and service-object interpretation reviewed manually. `r05` has an erroneous legacy `service_id=nvos_registration` in the source curated CSV; the newer provenance-linked overlay assigns `nvos_update`. Do not silently overwrite either source. No claim about legal obligations follows from these keywords.

## RSYA — separate audience and copy hypotheses (not launched)
| Group | Audience hypothesis (unverified) | Headline | Plain-language body | Intended diagnostic |
|---|---|---|---|---|
| RSYA_WASTE_COMPLIANCE | Руководители производств и специалисты, отвечающие за отходы | Паспорта отходов для предприятия | Не уверены, какие отходы нужно паспортизировать? Начните с проверки состава отходов и имеющихся документов. | диагностика отходов |
| RSYA_WASTE_SMALL_BUSINESS | Владельцы кафе и кофеен, управляющие | Документы по отходам для кафе | Проверьте, какие документы по отходам нужны именно вашему кафе. Начните с диагностики, а не с заказа лишних документов. | диагностика документов по отходам кафе |
| RSYA_NVOS_REGISTRATION | Руководители предприятий с производственными объектами | Учёт объекта НВОС | Нужно разобраться с постановкой объекта на учёт? Уточните исходные данные объекта перед оформлением заявки. | первичная постановка |
| RSYA_NVOS_UPDATE | Экологи и руководители предприятий с уже учтёнными объектами | Изменились сведения об объекте НВОС? | Проверьте, какие сведения об объекте требуется актуализировать и какие данные подготовить. | актуализация сведений |

RSYA copy is not a claim that all recipients must have a document. No unverified speed, guarantee, price, or geographic promise. Audiences are hypotheses, not platform-verified targeting segments.

## Manual handoff gates
1. Keep Search and RSYA campaigns separate. Do not merge `nvos_registration` with `nvos_update`.
2. Keep broad cafe requests «экологические документы» / «документы по отходам» outside the passport-only Search group; use diagnostic routing overlays, not original incorrect `waste_passport` classification.
3. Registry v0.1 has `verified_url: null` for `waste_passport` and `nvos_registration`, and no verified `nvos_update` or broad cafe route. No URLs inserted or invented. Before import, verify actual landing pages, forms, and lead qualification.
4. Validate ad length, targeting, negative-keyword intersections, and moderation requirements manually in the current Direct interface; not checked here.
5. A/B/C = heuristic order of tests, not frequency or conversion probability. Wordstat, spend, CPC, CTR, CVR and conversions: **not measured**.

Status: **manual draft only**, not launch-ready until landing and form tests. No advertising budget spent. No legal-core modifications.
