from pathlib import Path

from app.services.loader import stream_jsonl
from app.services.parser import parse_candidate
from app.services.document import build_candidate_document

ROOT = Path(__file__).resolve().parent.parent
DATASET = ROOT.parent / "dataset" / "candidates.jsonl"

for i, raw in enumerate(stream_jsonl(DATASET)):

    candidate = parse_candidate(raw)

    print("=" * 80)
    print(build_candidate_document(candidate))

    if i == 2:
        break