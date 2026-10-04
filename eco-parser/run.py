#!/usr/bin/env python3
from parsers.wordstat import run as wordstat_run
from parsers.direct_queries import main as direct_run
from scoring.rank import run as rank_run

if __name__=="__main__":
    rc=wordstat_run()
    direct_run()
    rank_run()
    raise SystemExit(rc)
