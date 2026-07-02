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
        Combine semantic similarity with business scoring
        and return the final ranked candidates.
        """

        ranked = []

        for candidate in candidates:
            business_score = self.scorer.score(candidate)

            candidate["business_score"] = business_score

            # Normalize business score to 0–1
            normalized_business = min(business_score / 0.25, 1.0)

            candidate["final_score"] = round(
                (candidate["similarity_score"] * 0.80)
                + (normalized_business * 0.20),
                4,
            )

            ranked.append(candidate)

        ranked.sort(
            key=lambda x: x["final_score"],
            reverse=True,
        )

        return ranked