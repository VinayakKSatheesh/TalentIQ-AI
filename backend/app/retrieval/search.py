from pathlib import Path

from app.retrieval.embedding import EmbeddingService
from app.retrieval.vector_store import VectorStore
from app.retrieval.metadata_store import MetadataStore
from app.retrieval.query_builder import QueryBuilder
from app.ranking.hybrid import HybridSearch

class SearchEngine:
    """
    Semantic search engine using FAISS + SQLite.
    """

    def __init__(
        self,
        index_path: Path,
        metadata_path: Path,
    ):

        self.embedding = EmbeddingService()

        self.vector_store = VectorStore.load(index_path)

        self.metadata_store = MetadataStore(metadata_path)
        self.hybrid_search = HybridSearch()
    def search(
        self,
        query: str,
        top_k: int = 10,
    ) -> list[dict]:
        """
        Perform semantic search and return the top matching candidates.
        """

        # Embed the recruiter query
        semantic_query = QueryBuilder.build(query)

        query_embedding = self.embedding.embed(semantic_query)

        # Search FAISS
        scores, vector_ids = self.vector_store.search(
            query_embedding,
            top_k=top_k,
        )

        results = []

        for score, vector_id in zip(scores, vector_ids):

            

            if vector_id == -1:
                continue

            candidate = self.metadata_store.get_candidate(int(vector_id))

            

            if candidate is None:
                continue

            candidate["similarity_score"] = float(score)

            results.append(candidate)

        return self.hybrid_search.rerank(results)