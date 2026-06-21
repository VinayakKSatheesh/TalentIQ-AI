class CandidateScorer:
    """
    Applies business scoring to semantic search results.
    """

    def score(
        self,
        candidate: dict,
    ) -> float:

        score = candidate["similarity_score"]

        # Experience bonus
        years = candidate["years_experience"]

        if years >= 8:
            score += 0.08
        elif years >= 5:
            score += 0.05
        elif years >= 3:
            score += 0.02

        # Open to work
        if candidate["open_to_work"]:
            score += 0.03

        # Short notice period
        notice = candidate["notice_period"]

        if notice <= 30:
            score += 0.03
        elif notice <= 60:
            score += 0.02

        return round(score, 4)