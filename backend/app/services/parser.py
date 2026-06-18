from app.models.candidate import Candidate


def parse_candidate(raw: dict) -> Candidate:
    return Candidate(
        candidate_id=raw.get("candidate_id", ""),

        profile=raw.get("profile", {}),

        career_history=raw.get("career_history", []),

        education=raw.get("education", []),

        skills=raw.get("skills", []),

        certifications=raw.get("certifications", []),

        languages=raw.get("languages", []),

        redrob_signals=raw.get("redrob_signals", {})
    )