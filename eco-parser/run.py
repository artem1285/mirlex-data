#!/usr/bin/env python3
from parsers.combinator import run as combinator_run
from parsers.wordstat import run as wordstat_run
from parsers.direct_queries import main as direct_run
from scoring.rank import run as rank_run
from scoring.mindmap import run as mindmap_run

if __name__=="__main__":
    combinator_run()
    rc=wordstat_run()
    direct_run()
    rank_run()
    mindmap_run()
    raise SystemExit(rc)
