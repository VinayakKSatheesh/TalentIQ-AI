import os
from pathlib import Path

import requests

BASE_PATH = (
    Path(__file__).resolve().parent.parent.parent
    / "data"
)

INDEX_PATH = Path(
    os.getenv(
        "INDEX_PATH",
        BASE_PATH / "indexes" / "candidate_index.faiss",
    )
)

DATASET_PATH = Path(
    os.getenv(
        "DATASET_PATH",
        BASE_PATH / "candidates.jsonl",
    )
)


def download_file_if_missing(path: Path, url_env: str, name: str):
    """
    Downloads a file if it does not already exist.
    """

    if path.exists():
        print(f"✅ {name} already exists.")
        return

    url = os.getenv(url_env)

    if not url:
        raise RuntimeError(f"{url_env} environment variable is missing.")

    print(f"⬇ Downloading {name}...")

    path.parent.mkdir(parents=True, exist_ok=True)

    response = requests.get(url, stream=True)
    response.raise_for_status()

    total = int(response.headers.get("content-length", 0))
    downloaded = 0

    with open(path, "wb") as f:
        for chunk in response.iter_content(chunk_size=8192):
            if chunk:
                f.write(chunk)
                downloaded += len(chunk)

                if total:
                    percent = downloaded * 100 / total
                    print(
                        f"\rDownloading {name}... {percent:.1f}%",
                        end=""
                    )

    print(f"\n✅ {name} downloaded successfully.")


def download_index_if_missing(index_path: Path):
    """
    Downloads all required assets for the backend.
    """

    download_file_if_missing(
        INDEX_PATH,
        "INDEX_URL",
        "FAISS Index",
    )
