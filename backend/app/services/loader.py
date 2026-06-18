import json
from pathlib import Path


def load_jsonl(path: Path):
    data = []

    with open(path, "r", encoding="utf-8") as file:
        for line in file:
            data.append(json.loads(line))

    return data