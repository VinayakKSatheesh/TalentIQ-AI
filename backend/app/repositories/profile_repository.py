from pathlib import Path
import json

from app.models.candidate import Candidate


class ProfileRepository:
    """
    Loads complete candidate profiles from candidates.jsonl.
    Used only for the Full Profile page.
    """

    def __init__(self, dataset_path: Path):
        self.dataset_path = dataset_path
        print(f"Dataset path: {self.dataset_path}")

    def get_candidate(
        self,
        candidate_id: str,
    ) -> Candidate | None:
        """
        Return one complete candidate profile by candidate ID.
        """

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