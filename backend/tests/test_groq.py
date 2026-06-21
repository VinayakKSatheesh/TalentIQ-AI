from app.llm.groq_client import GroqClient

client = GroqClient()

response = client.chat(
    "Reply with exactly these two words: TalentIQ Ready"
)

print(response)