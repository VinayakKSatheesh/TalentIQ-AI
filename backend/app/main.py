from fastapi import FastAPI

app = FastAPI(
    title="TalentIQ AI",
    version="1.0.0",
    description="AI Talent Intelligence Platform"
)


@app.get("/")
def home():
    return {
        "project": "TalentIQ AI",
        "status": "Running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }