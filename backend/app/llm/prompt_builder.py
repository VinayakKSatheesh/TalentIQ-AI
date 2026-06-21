import json


class PromptBuilder:
    """
    Builds structured prompts for the LLM.
    """

    @staticmethod
    def build(query: str, candidate: dict) -> str:

        candidate_json = json.dumps(
            candidate,
            indent=2,
        )

        return f"""
You are an expert AI recruitment assistant.

A recruiter is searching for:

{query}

Candidate:

{candidate_json}

Evaluate this candidate.

Return ONLY valid JSON using exactly this schema:

{{
    "match_score": 0,
    "strengths": [],
    "concerns": [],
    "recommendation": ""
}}

Rules:

- match_score must be between 0 and 100
- strengths must contain short bullet points
- concerns must contain short bullet points
- recommendation must be one concise sentence
- Return JSON only
""".strip()