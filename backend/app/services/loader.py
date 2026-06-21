import json
from pathlib import Path
from typing import Iterator


def stream_jsonl(path: Path) -> Iterator[dict]:
    """
    Stream JSONL records one at a time.
    """

    with open(path, "r", encoding="utf-8") as file:
        for line in file:
            yield json.loads(line)


def load_jsonl(path: Path) -> list[dict]:
    """
    Load the entire dataset (used for testing only).
    """

    return list(stream_jsonl(path))