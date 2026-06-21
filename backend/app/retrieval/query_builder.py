class QueryBuilder:
    """
    Builds a structured semantic query for embedding.
    """

    @staticmethod
    def build(query: str) -> str:
        return f"""
Recruiter Search Request

Target Role:
{query}

Find candidates with relevant experience, technical skills,
career history, backend engineering knowledge, software
development expertise, API development experience and matching
professional qualifications.

Return the best matching candidates.
""".strip()