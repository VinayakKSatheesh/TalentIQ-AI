from app.models.candidate import Candidate


def build_intelligence(candidate: Candidate) -> dict:

    profile = candidate.profile

    skills = []

    advanced = []
    intermediate = []
    beginner = []

    for skill in candidate.skills:

        name = skill.get("name", "")

        skills.append(name)

        level = skill.get("proficiency", "").lower()

        if level == "advanced":
            advanced.append(name)

        elif level == "intermediate":
            intermediate.append(name)

        else:
            beginner.append(name)

    career = []

    for job in candidate.career_history:

        career.append(
            {
                "company": job.get("company", ""),
                "title": job.get("title", ""),
                "duration": job.get("duration_months", 0),
                "industry": job.get("industry", "")
            }
        )

    education = []

    for edu in candidate.education:

        education.append(
            {
                "degree": edu.get("degree", ""),
                "field": edu.get("field_of_study", ""),
                "tier": edu.get("tier", "")
            }
        )

    return {

        "candidate_id": candidate.candidate_id,

        "headline": profile.get("headline", ""),

        "summary": profile.get("summary", ""),

        "years_experience": profile.get("years_of_experience", 0),

        "advanced_skills": advanced,

        "intermediate_skills": intermediate,

        "beginner_skills": beginner,

        "career": career,

        "education": education,

        "signals": candidate.redrob_signals
    }