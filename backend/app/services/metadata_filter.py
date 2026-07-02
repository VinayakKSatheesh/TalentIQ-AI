from app.models.search_request import SearchRequest


class MetadataFilter:
    """
    Applies recruiter filters after semantic retrieval.
    """

    ROLE_KEYWORDS = {
        "ai": [
            "ai",
            "artificial intelligence",
            "machine learning",
            "ml",
            "llm",
            "nlp",
            "rag",
            "vector",
            "embedding",
            "langchain",
            "langgraph",
            "genai",
            "pytorch",
            "tensorflow",
            "deep learning",
            "computer vision",
            "data scientist",
            "mlops",
        ]
    }

    def filter(
        self,
        candidates: list[dict],
        request: SearchRequest,
    ) -> list[dict]:

        filtered = []

        query = request.query.lower()

        role_keywords = []

        if any(word in query for word in ["ai", "machine learning", "ml", "llm", "genai"]):
            role_keywords = self.ROLE_KEYWORDS["ai"]

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

            # Role relevance
            if role_keywords:
                headline = candidate["headline"].lower()

                if not any(keyword in headline for keyword in role_keywords):
                    continue

            filtered.append(candidate)

        return filtered