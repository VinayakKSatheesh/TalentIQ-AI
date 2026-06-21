from pathlib import Path

from app.retrieval.index_builder import IndexBuilder


ROOT = Path(__file__).resolve().parent.parent

builder = IndexBuilder(
    dataset_path=ROOT.parent / "dataset" / "candidates.jsonl",
    index_path=ROOT / "data" / "indexes" / "candidate_index.faiss",
    metadata_path=ROOT / "data" / "metadata" / "candidate_metadata.db",
)

builder.build()