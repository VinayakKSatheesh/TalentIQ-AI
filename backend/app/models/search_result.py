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

    business_score: float

    final_score: float

    # Redrob Signals
    recruiter_response_rate: float
    github_activity_score: float
    interview_completion_rate: float
    offer_acceptance_rate: float
    profile_completeness: float
    last_active_date: str
    willing_to_relocate: bool
    verified_email: bool
    verified_phone: bool
    linkedin_connected: bool
    signup_date: str
    profile_views_30d: int
    applications_30d: int
    connection_count: int
    endorsements_received: int
    preferred_work_mode: str
    search_appearance_30d: int
    saved_by_recruiters_30d: int
    skill_assessment_scores: dict

    ai_analysis: AIAnalysis | None = None