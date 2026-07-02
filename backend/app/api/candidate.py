import os
from pathlib import Path

from fastapi import APIRouter, HTTPException

from app.services.profile_service import ProfileService

router = APIRouter(
    prefix="/candidate",
    tags=["Candidate"],
)

ROOT = Path(__file__).resolve().parent.parent.parent.parent

DATASET_PATH = Path(
    os.getenv(
        "DATASET_PATH",
        str(ROOT / "dataset" / "candidates.jsonl"),
    )
)

service = ProfileService(DATASET_PATH)


@router.get("/{candidate_id}")
def get_candidate(candidate_id: str):
    """
    Return one complete candidate profile.
    """

    candidate = service.get_candidate(candidate_id)

    if candidate is None:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found.",
        )

    return candidate