"""Industry query expansion adapted from the user's Kolesnikov matrix.

Axes: ЧТО / ДЛЯ ЧЕГО / КАКАЯ / ПРОДАЮЩАЯ ДОБАВКА / ГДЕ.
Only linguistic hypotheses, never Wordstat or legal conclusions.
"""
import re

# Human intent, not retail-only modifiers.
INTENT = {
    "destination": ["куда сдать", "куда передать", "куда девать", "вывоз", "что делать с"],
    "documentation": ["документы на", "как оформить", "требования к", "учёт"],
    "commercial": ["вывоз", "утилизация", "заказать", "стоимость"],
}

# Do not join arbitrary words like the original ecommerce worksheet:
# these templates encode meaningful grammatical relations.
TEMPLATES = {
    "waste": ["куда сдать {what}", "вывоз {what}", "документы на {what}",
              "утилизация {what}", "сколько стоит вывоз {what}"],
    "water": ["{what}", "куда отводить {what}", "документы на {what}"],
    "air": ["выбросы от {what}", "инвентаризация выбросов {what}",
            "{what} предприятие"],
    "general": ["{what}", "документы на {what}", "утилизация {what}"],
}

# Low-risk semantic routing, not classification of regulated wastes.
def axis_kind(term):
    t = term.lower()
    if any(x in t for x in ("сточн", "ливнев", "сток", "вод", "очистн", "осадок")):
        return "water"
    if any(x in t for x in ("пыль", "выброс", "дым", "пар бензин", "запах")):
        return "air"
    if any(x in t for x in ("шлам", "отход", "шины", "масло", "фильтр",
                           "ветош", "аккумулятор", "тара", "сорбент", "лом")):
        return "waste"
    return "general"

def build(industry, terms):
    """Yield (query, family, pain) with local de-duplication and bounds."""
    seen = set()
    for what in terms[:12]:
        what = re.sub(r"\\s+", " ", str(what)).strip()
        if not what:
            continue
        for tmpl in TEMPLATES[axis_kind(what)]:
            q = tmpl.format(what=what)
            if q.lower() not in seen:
                seen.add(q.lower())
                yield q, "KOLESNIKOV_WHAT_ACTION", what
        # WHERE: industry context as separate branch; never assume every
        # consumer/material query is a direct service lead.
        for tmpl in ("{what} {industry}", "вывоз {what} {industry}"):
            q = tmpl.format(what=what, industry=industry.lower())
            if len(q.split()) <= 12 and q.lower() not in seen:
                seen.add(q.lower())
                yield q, "KOLESNIKOV_WHAT_WHERE", what
