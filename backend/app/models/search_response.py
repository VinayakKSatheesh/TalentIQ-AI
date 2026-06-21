from pydantic import BaseModel

from app.models.search_result import SearchResult


class SearchResponse(BaseModel):
    count: int

    results: list[SearchResult]