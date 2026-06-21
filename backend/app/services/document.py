from app.models.candidate import Candidate


def build_candidate_document(candidate: Candidate) -> str:
    """
    Build a rich semantic document for embedding.
    """

    profile = candidate.profile
    signals = candidate.redrob_signals

    sections = []

    # ---------------------------------------------------------
    # Basic Profile
    # ---------------------------------------------------------

    sections.append(f"Candidate ID: {candidate.candidate_id}")

    sections.append(
        f"Headline: {profile.get('headline', '')}"
    )

    sections.append(
        f"Professional Summary: {profile.get('summary', '')}"
    )

    sections.append(
        f"Years of Experience: {profile.get('years_of_experience', 0)}"
    )

    sections.append("")

    # ---------------------------------------------------------
    # Skills
    # ---------------------------------------------------------

    sections.append("Technical Skills:")

    for skill in candidate.skills:

        name = skill.get("name", "")

        level = skill.get("proficiency", "")

        sections.append(f"{name} ({level})")

    sections.append("")

    # ---------------------------------------------------------
    # Career History
    # ---------------------------------------------------------

    sections.append("Career History:")

    for job in candidate.career_history:

        title = job.get("title", "")

        company = job.get("company", "")

        description = job.get("description", "")

        sections.append(
            f"{title} at {company}"
        )

        if description:
            sections.append(description)

    sections.append("")

    # ---------------------------------------------------------
    # Education
    # ---------------------------------------------------------

    sections.append("Education:")

    for edu in candidate.education:

        degree = edu.get("degree", "")

        field = edu.get("field_of_study", "")

        institute = edu.get("institution", "")

        sections.append(
            f"{degree} in {field} from {institute}"
        )

    sections.append("")

    # ---------------------------------------------------------
    # Certifications
    # ---------------------------------------------------------

    if candidate.certifications:

        sections.append("Certifications:")

        for cert in candidate.certifications:

            sections.append(
                cert.get("name", "")
            )

        sections.append("")

    # ---------------------------------------------------------
    # Languages
    # ---------------------------------------------------------

    if candidate.languages:

        sections.append("Languages:")

        for lang in candidate.languages:

            sections.append(
                lang.get("name", "")
            )

        sections.append("")

    # ---------------------------------------------------------
    # Recruiter Signals
    # ---------------------------------------------------------

    sections.append(
        f"Open To Work: {signals.get('open_to_work_flag', False)}"
    )

    sections.append(
        f"Notice Period: {signals.get('notice_period_days', 0)} days"
    )

    salary = signals.get(
        "expected_salary_range_inr_lpa",
        {}
    )

    sections.append(
        f"Expected Salary: {salary.get('min', 0)} - {salary.get('max', 0)} LPA"
    )

    return "\n".join(sections)