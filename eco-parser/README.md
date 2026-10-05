# MIRLEX ECO PARSER

Жёсткий парсер спроса и отраслей MIRLEX.

## Два параллельных контура

1. **services** — то, что можно рекламировать уже сейчас:
   - Паспорта отходов
   - НВОС
   - Учёт отходов
   - 2-ТП (отходы)
   - Воздух
   - Вода
   - РОП

2. **industries** — отраслевой радар для будущих посадочных страниц и квизов.

## Принцип

Парсер не присваивает финальный A/B/C/D рейтинг только по количеству экологических требований.
Сначала собираются фактические данные о спросе. Затем к ним добавляются конкуренция,
срочность, рынок предприятий, реальные лиды, средний чек-прокси и повторяемость.

Если данных недостаточно — статус `INSUFFICIENT_DATA`.

## Wordstat

Используется официальный Wordstat API в Yandex Search API:
`POST https://searchapi.api.cloud.yandex.net/v2/wordstat/topRequests`.

GitHub Secrets:
- `YANDEX_SEARCH_API_KEY`
- `YANDEX_FOLDER_ID`

Опционально:
- `YANDEX_WORDSTAT_REGIONS` — ID регионов через запятую
- `ECO_PARSER_BATCH` — число seed-фраз за один запуск (по умолчанию 40)

## Direct

После запуска рекламы подключается:
- `YANDEX_DIRECT_TOKEN`
- `YANDEX_DIRECT_LOGIN`

Источник: `SEARCH_QUERY_PERFORMANCE_REPORT` — реальные запросы, вызвавшие показы.

## Outputs

- `output/demand.json` — Wordstat-данные
- `output/ranking.json` — промежуточный demand-only рейтинг
- `output/status.json` — состояние парсера
- `output/wordstat-state.json` — курсор пакетного обхода

Финальный A/B/C/D рейтинг не генерируется, пока не заполнены остальные доказательные модули.


## Бесплатный режим рекламы

До подключения API парсер работает как semantic combinator:

- берет отрасли, услуги и pain-nodes из radar/mind-map;
- генерирует редкие и обычные человеческие формулировки;
- сохраняет их как гипотезы, а не как подтвержденный спрос;
- готовит пакеты для ручной проверки в Wordstat / Direct Commander.

Файлы:
- `output/generated-hypotheses.json`
- `output/generated-hypotheses.csv`
- `output/wordstat-free-batches.txt`
- `output/combinator-status.json`

Принцип: broad generation -> deduplication -> Wordstat validation -> ad test -> real Direct queries -> leads -> contracts.

Широкие и редкие запросы не отбрасываются заранее только потому, что выглядят странно или имеют низкую предполагаемую частоту.
