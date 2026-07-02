class QueryBuilder:
    """
    Builds a recruiter-focused semantic query for embedding.
    """

    @staticmethod
    def build(query: str) -> str:
        return f"""
Recruiter Search Request

Target Role:
{query}

Prioritize candidates who demonstrate:

- Relevant production experience
- Strong technical skills aligned with the role
- End-to-end project ownership
- Career progression and impact
- Practical problem-solving ability
- Modern software engineering practices
- Product-company or real-world engineering experience
- Strong communication and collaboration
- High likelihood of responding to recruiters
- Recent platform activity and hiring availability

Return candidates whose overall experience and career history best match the intent of this hiring request, not just candidates with matching keywords.
""".strip()