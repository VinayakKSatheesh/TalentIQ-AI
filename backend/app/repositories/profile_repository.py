from pathlib import Path
import json

from app.models.candidate import Candidate

from app.utils.download_index import (
    download_file_if_missing,
)


class ProfileRepository:
    """
    Loads complete candidate profiles from candidates.jsonl.
    Downloads the dataset automatically if missing.
    """

    def __init__(
        self,
        dataset_path: Path,
    ):
        self.dataset_path = dataset_path

    def get_candidate(
        self,
        candidate_id: str,
    ) -> Candidate | None:

        # Download dataset only when needed
        download_file_if_missing(
            self.dataset_path,
            "DATASET_URL",
            "Candidate Dataset",
        )

        with open(
            self.dataset_path,
            "r",
            encoding="utf-8",
        ) as file:

            for line in file:

                data = json.loads(line)

                if data["candidate_id"] == candidate_id:
                    return Candidate(**data)

        return None