from pathlib import Path

from app.services.loader import load_jsonl
from app.services.parser import parse_candidate
from app.services.intelligence import build_intelligence

ROOT = Path(__file__).resolve().parent.parent

DATASET = ROOT.parent / "dataset" / "candidates.jsonl"

raw = load_jsonl(DATASET)

candidate = parse_candidate(raw[0])

intel = build_intelligence(candidate)

from pprint import pprint

pprint(intel)