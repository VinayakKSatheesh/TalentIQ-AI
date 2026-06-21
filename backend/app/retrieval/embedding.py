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
        Embed a single document.
        """

        embedding = EmbeddingService._model.encode(
            text,
            normalize_embeddings=True,
            convert_to_numpy=True
        )

        return embedding.astype(np.float32)

    def embed_batch(
        self,
        texts: list[str]
    ) -> np.ndarray:
        """
        Embed multiple documents at once.
        """

        embeddings = EmbeddingService._model.encode(
            texts,
            normalize_embeddings=True,
            convert_to_numpy=True,
            show_progress_bar=False
        )

        return embeddings.astype(np.float32)

    def dimension(self):

        return EmbeddingService._model.get_sentence_embedding_dimension()