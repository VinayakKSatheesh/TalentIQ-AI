from typing import Any
from pydantic import BaseModel, Field


class Candidate(BaseModel):
    candidate_id: str

    profile: dict[str, Any] = Field(default_factory=dict)
    career_history: list[dict[str, Any]] = Field(default_factory=list)
    education: list[dict[str, Any]] = Field(default_factory=list)
    skills: list[dict[str, Any]] = Field(default_factory=list)
    certifications: list[dict[str, Any]] = Field(default_factory=list)
    languages: list[dict[str, Any]] = Field(default_factory=list)
    redrob_signals: dict[str, Any] = Field(default_factory=dict)