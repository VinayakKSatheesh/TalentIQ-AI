import os
from pathlib import Path

import requests


INDEX_PATH = Path(
    os.getenv(
        "INDEX_PATH",
        Path(__file__).resolve().parent.parent.parent
        / "data"
        / "indexes"
        / "candidate_index.faiss",
    )
)

def download_index_if_missing(index_path: Path):
    """
    Downloads the FAISS index from Hugging Face
    if it doesn't already exist.
    """

    if INDEX_PATH.exists():
        print("✅ FAISS index already exists.")
        return

    url = os.getenv("INDEX_URL")

    if not url:
        raise RuntimeError("INDEX_URL environment variable is missing.")

    print("⬇ Downloading FAISS index...")

    INDEX_PATH.parent.mkdir(parents=True, exist_ok=True)

    response = requests.get(url, stream=True)
    response.raise_for_status()

    total = int(response.headers.get("content-length", 0))
    downloaded = 0

    with open(INDEX_PATH, "wb") as f:
        for chunk in response.iter_content(chunk_size=8192):
            if chunk:
                f.write(chunk)
                downloaded += len(chunk)

                if total:
                    percent = downloaded * 100 / total
                    print(
                        f"\rDownloading... {percent:.1f}%",
                        end=""
                    )

    print("\n✅ FAISS index downloaded successfully.")