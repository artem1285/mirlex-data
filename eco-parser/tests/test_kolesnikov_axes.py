import unittest
from parsers.kolesnikov_axes import build_from_engine

class CoreEvidenceTests(unittest.TestCase):
    def test_carwash(self):
        rows = list(build_from_engine("IND-001"))
        self.assertTrue(any(x[2] == "ENG-CARWASH-WW-TANK-001" for x in rows))
    def test_construction(self):
        rows = list(build_from_engine("IND-018"))
        self.assertTrue(any(x[2] == "IND-CONSTRUCTION-002" for x in rows))
    def test_no_unsupported_sector(self):
        self.assertEqual(list(build_from_engine("IND-057")), [])
    def test_no_rop(self):
        for industry in ("IND-001", "IND-018", "IND-057"):
            self.assertFalse(any("роп" in x[0].lower() for x in build_from_engine(industry)))

if __name__ == "__main__":
    unittest.main()
