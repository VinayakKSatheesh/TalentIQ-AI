from pydantic import BaseModel

from app.models.ai_analysis import AIAnalysis


class SearchResult(BaseModel):
    candidate_id: str

    headline: str

    years_experience: float

    notice_period: int

    salary_min: float

    salary_max: float

    open_to_work: bool

    similarity_score: float

    final_score: float

    ai_analysis: AIAnalysis | None = None