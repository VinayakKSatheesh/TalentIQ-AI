from app.ranking.scorer import CandidateScorer


class HybridSearch:
    """
    Combines semantic similarity with business scoring.
    """

    def __init__(self):
        self.scorer = CandidateScorer()

    def rerank(
        self,
        candidates: list[dict],
    ) -> list[dict]:
        """
        Apply business scoring and sort candidates.
        """

        ranked = []

        for candidate in candidates:

            candidate["final_score"] = self.scorer.score(candidate)

            ranked.append(candidate)

        ranked.sort(
            key=lambda x: x["final_score"],
            reverse=True,
        )

        return ranked