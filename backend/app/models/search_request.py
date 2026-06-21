from pydantic import BaseModel, Field


class SearchRequest(BaseModel):
    """
    Recruiter search request.
    """

    query: str

    top_k: int = 10

    analyze: bool = False

    min_experience: float | None = None

    max_notice_period: int | None = None

    open_to_work: bool | None = None

    required_skills: list[str] = Field(default_factory=list)