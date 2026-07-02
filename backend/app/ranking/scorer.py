class CandidateScorer:
    """
    Applies business scoring to semantic search results.
    """

    def score(self, candidate: dict) -> float:
        score = 0.0

        years = candidate.get("years_experience", 0)
        notice = candidate.get("notice_period", 999)
        response = candidate.get("recruiter_response_rate", 0.0)
        completion = candidate.get("interview_completion_rate", 0.0)
        offer = candidate.get("offer_acceptance_rate", 0.0)
        github = candidate.get("github_activity_score", 0.0)
        profile = candidate.get("profile_completeness", 0.0)

        if years >= 8:
            score += 0.08
        elif years >= 5:
            score += 0.05
        elif years >= 3:
            score += 0.02

        if candidate.get("open_to_work", False):
            score += 0.03

        if notice <= 30:
            score += 0.03
        elif notice <= 60:
            score += 0.02

        if response >= 0.80:
            score += 0.04
        elif response >= 0.60:
            score += 0.02

        if completion >= 0.90:
            score += 0.03
        elif completion >= 0.70:
            score += 0.015

        if offer >= 0.80:
            score += 0.03
        elif offer >= 0.60:
            score += 0.015

        if github >= 80:
            score += 0.02
        elif github >= 50:
            score += 0.01

        if profile >= 90:
            score += 0.02
        elif profile >= 70:
            score += 0.01

        if candidate.get("verified_email", False):
            score += 0.005

        if candidate.get("verified_phone", False):
            score += 0.005

        return round(score, 4)