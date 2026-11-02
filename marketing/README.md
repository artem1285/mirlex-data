# MIRLEX | ECO PARSER / Advertising Keywords (v0.1)

Independent marketing layer. Does not change MIRLEX legal datasets.

## Pipeline
industry → process → impact/problem → service → five-column combinatorics → hypotheses → deduplication → intent → frequency verification → groups → negative overlap validation → landing → export.

Run: `python marketing/eco_parser.py`.
Output: `marketing/keywords/hypotheses.csv` (generated locally). All new phrases start as `hypothesis`; `frequency`, `checked_at`, `landing_url` and `region` remain empty unless sourced or verified.

Wordstat frequency must be imported from an authorized verifiable API/export with source, date, query expression and geography. No inferred frequency. Ad publication and spending are outside this module.
GitHub branch: `feature/eco-parser-marketing-v1`; merge after review.

Never introduce a blanket negative phrase without checking overlap against approved positives. Do not expose API keys or customer data in this public repository.
