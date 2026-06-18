from pathlib import Path

from app.services.loader import load_jsonl
from app.services.parser import parse_candidate
from app.services.document import build_candidate_document

ROOT = Path(__file__).resolve().parent.parent

DATASET = ROOT.parent / "dataset" / "candidates.jsonl"

print(DATASET)
print(DATASET.exists())
raw = load_jsonl(DATASET)

candidate = parse_candidate(raw[0])

doc = build_candidate_document(candidate)

print(doc)