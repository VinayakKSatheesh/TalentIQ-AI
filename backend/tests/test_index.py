from pathlib import Path

from app.retrieval.vector_store import VectorStore
from app.retrieval.embedding import EmbeddingService

ROOT = Path(__file__).resolve().parent.parent

store = VectorStore.load(
    ROOT / "data" / "indexes" / "candidate_index.faiss"
)

print("Vectors:", store.size)

embedder = EmbeddingService()

query = embedder.embed("Python developer")

scores, indices = store.search(query, top_k=5)

print("Scores:", scores)
print("Indices:", indices)