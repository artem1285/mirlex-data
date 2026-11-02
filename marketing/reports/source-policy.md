# Evidence and verification rules

- `mindmap:initial_dictionary` = invented/search hypothesis, **not search demand**.
- Store observed frequency only with service, region, period, operator and source record.
- Differentiate broad Wordstat counts from exact match and regional metrics.
- Keep blank statistics blank. Never insert 0 as a replacement for missing data.
- Never change `status` to `verified` solely because a phrase sounds commercial.
- Keep negative words as candidates; reject any overlap with accepted positive keys before platform export.
- Existing VK campaign status requires checking inside the advertising account; do not claim live.
- Avoid exposing customer identity, API tokens or campaign secrets in this public repository.

References:
- https://aistudio.yandex.ru/ru/docs/search-api/concepts/wordstat
- https://yandex.ru/support2/wordstat/ru/content/api-wordstat
- https://yandex.ru/support2/wordstat/ru/interface/new
