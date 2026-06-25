from fastapi import FastAPI

from app.api.router import api_router
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from app.utils.download_index import download_index_if_missing

import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

index_path = Path(
    os.getenv(
        "INDEX_PATH",
        str(ROOT / "data" / "indexes" / "candidate_index.faiss"),
    )
)



download_index_if_missing(index_path)
from app.utils.download_index import download_index_if_missing
app = FastAPI(
    title="TalentIQ AI",
    version="1.0.0",
    description="AI-powered Recruitment Platform",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
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