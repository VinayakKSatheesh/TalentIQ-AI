from app.models.candidate import Candidate


def build_candidate_document(candidate: Candidate) -> str:

    profile = candidate.profile

    lines = []

    lines.append(f"Candidate ID: {candidate.candidate_id}")

    lines.append(f"Headline: {profile.get('headline', '')}")

    lines.append(f"Summary: {profile.get('summary', '')}")

    lines.append("")

    lines.append("Skills:")

    for skill in candidate.skills:
        lines.append(
            f"- {skill.get('name', '')} "
            f"({skill.get('proficiency', '')})"
        )

    lines.append("")

    lines.append("Career History:")

    for job in candidate.career_history:
        company = job.get("company", "")
        title = job.get("title", "")

        lines.append(f"{title} at {company}")
        
    lines.append("")

    lines.append("Education:")

    for edu in candidate.education:
        lines.append(
            f"{edu.get('degree', '')} "
            f"{edu.get('field_of_study', '')}"
        )

    return "\n".join(lines)