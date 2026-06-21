import numpy as np
from pathlib import Path

from app.retrieval.vector_store import VectorStore

DIM = 768

store = VectorStore(DIM)

vectors = np.random.rand(5, DIM).astype(np.float32)

# Normalize vectors (same as embedding model)
vectors /= np.linalg.norm(vectors, axis=1, keepdims=True)

store.add(vectors)

print("Vectors in index:", store.size)

query = vectors[0]

scores, indices = store.search(query, top_k=3)

print("Top indices:", indices)

print("Scores:", scores)

index_path = Path("vector_test.faiss")

store.save(index_path)

loaded = VectorStore.load(index_path)

print("Loaded vectors:", loaded.size)

index_path.unlink()