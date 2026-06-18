from sentence_transformers import SentenceTransformer
import numpy as np


class EmbeddingService:
    """
    Singleton embedding service.
    Loads the embedding model once and reuses it.
    """

    _model = None

    def __init__(self):
        if EmbeddingService._model is None:
            print("Loading embedding model...")
            EmbeddingService._model = SentenceTransformer(
                "BAAI/bge-base-en-v1.5"
            )
            print("Embedding model loaded.")

    def embed(self, text: str) -> np.ndarray:
        """
        Generate embedding for a single text.
        """
        embedding = EmbeddingService._model.encode(
            text,
            normalize_embeddings=True
        )

        return np.array(embedding, dtype=np.float32)

    def dimension(self) -> int:
        return EmbeddingService._model.get_sentence_embedding_dimension()