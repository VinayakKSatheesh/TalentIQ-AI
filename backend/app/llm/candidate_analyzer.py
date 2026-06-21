import json
import re

from app.llm.groq_client import GroqClient
from app.llm.prompt_builder import PromptBuilder


class CandidateAnalyzer:
    """
    Uses Groq to analyze a candidate against
    a recruiter query.
    """

    def __init__(self):
        self.client = GroqClient()

    def analyze(
        self,
        query: str,
        candidate: dict,
    ) -> dict:

        prompt = PromptBuilder.build(
            query=query,
            candidate=candidate,
        )

        response = self.client.chat(prompt)

        # Extract JSON even if wrapped in markdown
        response = response.strip()

        match = re.search(r"\{.*\}", response, re.DOTALL)

        if match:
            response = match.group(0)

        try:
            return json.loads(response)

        except json.JSONDecodeError:

            return {
                "match_score": 0,
                "strengths": [],
                "concerns": [
                    "Unable to parse LLM response."
                ],
                "recommendation": response,
            }