import sys
import unittest
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from eco_parser import normalize, generate, negative_overlaps

class Tests(unittest.TestCase):
    def test_normalization(self):
        self.assertEqual(normalize("  ПАСПОРТ   ОТХОДОВ Ё "), "паспорт отходов е")
    def test_stability_and_distinct_services(self):
        a={"industry_id":"a","service_id":"a","what":["паспорт"],"purpose":[],"quality":[],"buy":[],"where":[]}
        b=dict(a,service_id="b")
        rows=generate([a,b,a])
        self.assertEqual(len(rows),2)
        self.assertNotEqual(rows[0]["keyword_id"],rows[1]["keyword_id"])
        self.assertTrue(all(not r["frequency"] and r["status"]=="hypothesis" for r in rows))
    def test_negative_overlap(self):
        rows=[{"normalized_phrase":"утилизация компьютеров для организаций","status":"accepted"}]
        self.assertIn("компьютеров",negative_overlaps(rows,["компьютеров"]))
if __name__=="__main__": unittest.main()
