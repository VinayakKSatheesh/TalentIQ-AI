from pathlib import Path

from app.retrieval.search import SearchEngine


ROOT = Path(__file__).resolve().parent.parent

engine = SearchEngine(
    index_path=ROOT / "data" / "indexes" / "candidate_index.faiss",
    metadata_path=ROOT / "data" / "metadata" / "candidate_metadata.db",
)

results = engine.search(
    "Python Backend Developer with FastAPI",
    top_k=5,
)

for i, candidate in enumerate(results, start=1):

    print(f"\nResult {i}")

    print("-" * 40)

    for key, value in candidate.items():
        print(f"{key}: {value}")
results = engine.search(
    "Python Backend Developer with FastAPI",
    top_k=5,
)

print("Number of results:", len(results))
print(results)       