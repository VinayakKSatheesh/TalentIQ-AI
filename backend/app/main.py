from fastapi import FastAPI

from app.api.router import api_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="TalentIQ AI",
    version="1.0.0",
    description="AI-powered Recruitment Platform",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.get("/")
def root():
    return {
        "message": "TalentIQ AI Backend Running"
    }