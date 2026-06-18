from pathlib import Path

from app.services.loader import load_jsonl
from app.services.parser import parse_candidate
from app.services.document import build_candidate_document
from app.retrieval.embedding import EmbeddingService

ROOT = Path(__file__).resolve().parent.parent
DATASET = ROOT.parent / "dataset" / "candidates.jsonl"

raw = load_jsonl(DATASET)

candidate = parse_candidate(raw[0])

document = build_candidate_document(candidate)

service = EmbeddingService()

embedding = service.embed(document)

print("Embedding Dimension:", service.dimension())
print("Embedding Shape:", embedding.shape)
print("First 10 Values:")
print(embedding[:10])