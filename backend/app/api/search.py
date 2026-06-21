from pathlib import Path

from fastapi import APIRouter

from app.models.search_request import SearchRequest
from app.services.search_service import SearchService

router = APIRouter(
    prefix="/search",
    tags=["Search"],
)

ROOT = Path(__file__).resolve().parent.parent.parent

service = SearchService(
    index_path=ROOT / "data" / "indexes" / "candidate_index.faiss",
    metadata_path=ROOT / "data" / "metadata" / "candidate_metadata.db",
)


@router.post("")
def search(request: SearchRequest):

    results = service.search(request)

    from app.models.search_response import SearchResponse
    from app.models.search_result import SearchResult

    return SearchResponse(
    count=len(results),
    results=[
        SearchResult(**candidate)
        for candidate in results
    ],
)