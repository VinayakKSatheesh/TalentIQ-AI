from app.models.search_request import SearchRequest


class MetadataFilter:
    """
    Applies recruiter filters after semantic retrieval.
    """

    def filter(
        self,
        candidates: list[dict],
        request: SearchRequest,
    ) -> list[dict]:

        filtered = []

        for candidate in candidates:

            # Minimum experience
            if (
                request.min_experience is not None
                and candidate["years_experience"] < request.min_experience
            ):
                continue

            # Maximum notice period
            if (
                request.max_notice_period is not None
                and candidate["notice_period"] > request.max_notice_period
            ):
                continue

            # Open to work
            if (
                request.open_to_work is not None
                and candidate["open_to_work"] != request.open_to_work
            ):
                continue

            filtered.append(candidate)

        return filtered