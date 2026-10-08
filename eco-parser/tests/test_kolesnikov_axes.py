"""Regression checks for the additive industry query expansion."""
import unittest
from parsers.kolesnikov_axes import build, axis_kind

class IndustryAxesTests(unittest.TestCase):
    def test_automoyka_has_stocks_and_nonwater_pains(self):
        result = list(build("Автомойки", ["сточные воды", "шлам автомойки", "нефтеловушка"]))
        queries = [x[0] for x in result]
        self.assertIn("очистка сточные воды", queries)
        self.assertIn("вывоз шлам автомойки", queries)
        self.assertIn("нефтеловушка автомойки", queries)

    def test_distinct_de_dup(self):
        q = list(build("СТО", ["шины", "шины", "отходы масел"]))
        self.assertEqual(len({r[0].lower() for r in q}), len(q))

    def test_upper_bound(self):
        q = list(build("СТО", ["масло"] * 40))
        self.assertLessEqual(len(q), 7)

    def test_axes_routing(self):
        self.assertEqual(axis_kind("ливневые воды"), "water")
        self.assertEqual(axis_kind("пыль"), "air")
        self.assertEqual(axis_kind("аккумуляторы"), "waste")

    def test_no_rop(self):
        q = list(build("Автомойки", ["сточные воды", "шлам"]))
        self.assertFalse(any("РОП" in s[0] for s in q))

if __name__ == "__main__":
    unittest.main()
