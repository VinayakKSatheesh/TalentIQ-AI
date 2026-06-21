from pydantic import BaseModel, Field


class AIAnalysis(BaseModel):
    """
    AI-generated candidate evaluation.
    """

    match_score: int = Field(..., ge=0, le=100)

    strengths: list[str] = Field(default_factory=list)

    concerns: list[str] = Field(default_factory=list)

    recommendation: str