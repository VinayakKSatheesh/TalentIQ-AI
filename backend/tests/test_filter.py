from app.models.search_request import SearchRequest
from app.services.metadata_filter import MetadataFilter

request = SearchRequest(
    query="Python Backend Developer",
    min_experience=5,
    max_notice_period=60,
    open_to_work=True,
)

candidates = [
    {
        "candidate_id": "A",
        "years_experience": 6,
        "notice_period": 30,
        "open_to_work": True,
    },
    {
        "candidate_id": "B",
        "years_experience": 2,
        "notice_period": 30,
        "open_to_work": True,
    },
    {
        "candidate_id": "C",
        "years_experience": 8,
        "notice_period": 90,
        "open_to_work": True,
    },
]

filtered = MetadataFilter().filter(candidates, request)

print(filtered)