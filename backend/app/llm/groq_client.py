import os

from dotenv import load_dotenv
from groq import Groq

load_dotenv()


class GroqClient:
    """
    Wrapper around the Groq API.
    """

    def __init__(self):

        api_key = os.getenv("GROQ_API_KEY")

        if not api_key:
            raise ValueError("GROQ_API_KEY not found.")

        self.client = Groq(api_key=api_key)

    def chat(
        self,
        prompt: str,
        model: str = "llama-3.3-70b-versatile",
    ) -> str:

        response = self.client.chat.completions.create(
            model=model,
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            temperature=0.2,
        )

        return response.choices[0].message.content