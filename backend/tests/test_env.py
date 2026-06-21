import os
from dotenv import load_dotenv

load_dotenv()

print("Groq Key Found:", bool(os.getenv("GROQ_API_KEY")))