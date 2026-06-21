from pathlib import Path
from app.retrieval.metadata_store import MetadataStore

ROOT = Path(__file__).resolve().parent.parent

db = MetadataStore(
    ROOT / "data" / "metadata" / "candidate_metadata.db"
)

candidate = db.get_candidate(60853)

print(candidate)