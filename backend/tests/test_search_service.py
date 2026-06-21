from pathlib import Path

from app.services.search_service import SearchService


ROOT = Path(__file__).resolve().parent.parent

service = SearchService(
    index_path=ROOT / "data" / "indexes" / "candidate_index.faiss",
    metadata_path=ROOT / "data" / "metadata" / "candidate_metadata.db",
)

results = service.search(
    "Python Backend Developer with FastAPI",
    top_k=5,
)

print("\nTalentIQ Search Results\n")

for i, candidate in enumerate(results, start=1):

    print(f"{i}. {candidate['candidate_id']}")

    print("   Headline :", candidate["headline"])
    print("   Score    :", candidate["final_score"])
    print()