from pathlib import Path

from app.repositories.profile_repository import ProfileRepository


class ProfileService:
    """
    Service responsible for returning
    complete candidate profiles.
    """

    def __init__(
        self,
        dataset_path: Path,
    ):
        self.repository = ProfileRepository(dataset_path)

    def get_candidate(
        self,
        candidate_id: str,
    ):
        """
        Return one complete candidate profile.
        """

        return self.repository.get_candidate(
            candidate_id
        )