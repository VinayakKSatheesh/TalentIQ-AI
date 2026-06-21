from pathlib import Path

from app.retrieval.search import SearchEngine
from app.ranking.hybrid import HybridSearch


ROOT = Path(__file__).resolve().parent.parent

engine = SearchEngine(
    index_path=ROOT / "data" / "indexes" / "candidate_index.faiss",
    metadata_path=ROOT / "data" / "metadata" / "candidate_metadata.db",
)

results = engine.search(
    "Python Backend Developer with FastAPI",
    top_k=10,
)

hybrid = HybridSearch()

ranked = hybrid.rerank(results)

print("\nTop Candidates\n")

for i, candidate in enumerate(ranked, start=1):

    print(f"{i}. {candidate['candidate_id']}")

    print("   Headline:", candidate["headline"])

    print("   Similarity:", candidate["similarity_score"])

    print("   Final Score:", candidate["final_score"])

    print()