# MIRLEX WATER v1.0.0

Файлы:
- voda-app.js — интерфейс, маршрутизация, безопасные диагностические результаты, передача в Tilda.
- voda-processes.json — 7 верхнеуровневых входов WATER.
- voda-rules.json — вопросы, условия показа и диагностические правила.
- voda-documents.json — проверка документов.
- voda-tests.json — сценарные тесты.
- voda-config.json — конфигурация.
- voda-t123.html — минимальный loader для блока T123.

Tilda popup: #popup:voda

Скрытые поля:
- voda_versiya
- voda_processy
- voda_status_obekta
- voda_dokumenty
- voda_otvety_diagnostiki
- voda_rezultat_proverki
- voda_vremya_prohozhdeniya
- voda_stranitsa

Правило публичного результата:
онлайн-диагностика сообщает только факты, контуры проверки, противоречия и RED FLAG.
Категоричный юридический вывод формируется после проверки документов и фактической схемы.
