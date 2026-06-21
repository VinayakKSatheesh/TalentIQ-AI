from pathlib import Path

import faiss
import numpy as np


class VectorStore:
    """
    FAISS vector store for semantic retrieval.
    """

    def __init__(self, dimension: int):
        self.dimension = dimension

        # Inner Product works because embeddings are normalized.
        self.index = faiss.IndexFlatIP(dimension)

    def add(self, embeddings: np.ndarray):
        """
        Add embeddings to the index.
        """
        embeddings = embeddings.astype(np.float32)
        self.index.add(embeddings)

    def search(self, embedding: np.ndarray, top_k: int = 10):
        """
        Search the index.
        """
        embedding = np.array([embedding], dtype=np.float32)

        scores, indices = self.index.search(
            embedding,
            top_k
        )

        return scores[0], indices[0]

    def save(self, path: Path):
        """
        Save FAISS index.
        """
        path.parent.mkdir(
            parents=True,
            exist_ok=True
        )

        faiss.write_index(
            self.index,
            str(path)
        )

    @classmethod
    def load(cls, path: Path):
        """
        Load FAISS index.
        """
        index = faiss.read_index(str(path))

        obj = cls(index.d)
        obj.index = index

        return obj

    @property
    def size(self):
        """
        Number of vectors.
        """
        return self.index.ntotal