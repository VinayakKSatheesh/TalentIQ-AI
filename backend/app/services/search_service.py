from pathlib import Path

from app.models.search_request import SearchRequest

from app.retrieval.search import SearchEngine
from app.ranking.hybrid import HybridSearch
from app.services.metadata_filter import MetadataFilter
from app.llm.candidate_analyzer import CandidateAnalyzer


class SearchService:
    """
    High-level service that orchestrates
    semantic search, filtering, ranking,
    and optional AI analysis.
    """

    def __init__(
        self,
        index_path: Path,
        metadata_path: Path,
    ):

        self.search_engine = SearchEngine(
            index_path=index_path,
            metadata_path=metadata_path,
        )

        self.metadata_filter = MetadataFilter()

        self.hybrid = HybridSearch()

        self.analyzer = CandidateAnalyzer()

    def search(
        self,
        request: SearchRequest,
    ) -> list[dict]:
        """
        Complete recruiter search pipeline.
        """

        # Semantic Search
        candidates = self.search_engine.search(
            query=request.query,
            top_k=100,
        )

        # Metadata Filtering
        candidates = self.metadata_filter.filter(
            candidates,
            request,
        )

        # Hybrid Ranking
        ranked = self.hybrid.rerank(candidates)

        # Keep only requested number of results
        ranked = ranked[:request.top_k]

        # Optional AI Analysis
        if request.analyze:

            for candidate in ranked[:5]:

                candidate["ai_analysis"] = self.analyzer.analyze(
                    query=request.query,
                    candidate=candidate,
                )

        return ranked