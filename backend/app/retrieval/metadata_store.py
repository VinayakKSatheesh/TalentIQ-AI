from pathlib import Path
import sqlite3
from pathlib import Path
import sqlite3
import json

class MetadataStore:
    """
    Stores metadata for every vector in SQLite.
    """

    def __init__(self, database_path: Path):
        database_path.parent.mkdir(parents=True, exist_ok=True)

        self.connection = sqlite3.connect(
            database_path,
            check_same_thread=False
        )
        self.cursor = self.connection.cursor()
        self.create_tables()

    def create_tables(self):
        self.cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS candidates (

    vector_id INTEGER PRIMARY KEY,

    candidate_id TEXT,

    headline TEXT,

    years_experience REAL,

    notice_period INTEGER,

    salary_min REAL,

    salary_max REAL,

    open_to_work INTEGER,

    recruiter_response_rate REAL,

    github_activity_score REAL,

    interview_completion_rate REAL,

    offer_acceptance_rate REAL,

    profile_completeness REAL,

    last_active_date TEXT,

    willing_to_relocate INTEGER,

    verified_email INTEGER,

    verified_phone INTEGER,

    linkedin_connected INTEGER,

signup_date TEXT,

profile_views_30d INTEGER,

applications_30d INTEGER,

connection_count INTEGER,

endorsements_received INTEGER,

preferred_work_mode TEXT,

search_appearance_30d INTEGER,

saved_by_recruiters_30d INTEGER,

skill_assessment_scores TEXT
)
            """
        )

        self.connection.commit()

    def insert(self, vector_id: int, candidate):

        signals = candidate.redrob_signals

        salary = signals.get(
            "expected_salary_range_inr_lpa",
            {}
        )

        self.cursor.execute(
            """
            INSERT INTO candidates (
    vector_id,
    candidate_id,
    headline,
    years_experience,
    notice_period,
    salary_min,
    salary_max,
    open_to_work,
    recruiter_response_rate,
    github_activity_score,
    interview_completion_rate,
    offer_acceptance_rate,
    profile_completeness,
    last_active_date,
    willing_to_relocate,
    verified_email,
    verified_phone,
    linkedin_connected,
    signup_date,
    profile_views_30d,
    applications_30d,
    connection_count,
    endorsements_received,
    preferred_work_mode,
    search_appearance_30d,
    saved_by_recruiters_30d,
    skill_assessment_scores
)
VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
            """,
            (
    vector_id,
    candidate.candidate_id,
    candidate.profile.get("headline", ""),
    candidate.profile.get("years_of_experience", 0),
    signals.get("notice_period_days", 0),
    salary.get("min", 0),
    salary.get("max", 0),
    int(signals.get("open_to_work_flag", False)),

    signals.get("recruiter_response_rate", 0),

    signals.get("github_activity_score", 0),

    signals.get("interview_completion_rate", 0),

    signals.get("offer_acceptance_rate", 0),

    signals.get("profile_completeness_score", 0),

    signals.get("last_active_date", ""),

    int(signals.get("willing_to_relocate", False)),

    int(signals.get("verified_email", False)),

    int(signals.get("verified_phone", False)),

    int(signals.get("linkedin_connected", False)),
    signals.get("signup_date", ""),

signals.get("profile_views_received_30d", 0),

signals.get("applications_submitted_30d", 0),

signals.get("connection_count", 0),

signals.get("endorsements_received", 0),

signals.get("preferred_work_mode", ""),

signals.get("search_appearance_30d", 0),

signals.get("saved_by_recruiters_30d", 0),

json.dumps(
    signals.get("skill_assessment_scores", {})
),
),
        )

    def commit(self):
        self.connection.commit()

    def close(self):
        self.connection.close()

    def count(self) -> int:
        self.cursor.execute("SELECT COUNT(*) FROM candidates")
        return self.cursor.fetchone()[0]
    def get_candidate(self, vector_id: int) -> dict | None:
        """
        Retrieve one candidate by vector ID.
        """

        self.cursor.execute(
            """
            SELECT
    candidate_id,
    headline,
    years_experience,
    notice_period,
    salary_min,
    salary_max,
    open_to_work,
    recruiter_response_rate,
    github_activity_score,
    interview_completion_rate,
    offer_acceptance_rate,
    profile_completeness,
    last_active_date,
    willing_to_relocate,
    verified_email,
    verified_phone,
    linkedin_connected,
    signup_date,

profile_views_30d,

applications_30d,

connection_count,

endorsements_received,

preferred_work_mode,

search_appearance_30d,

saved_by_recruiters_30d,

skill_assessment_scores
            FROM candidates
            WHERE vector_id = ?
            """,
            (vector_id,),
        )

        row = self.cursor.fetchone()

        if row is None:
            return None

        return {
    "candidate_id": row[0],
    "headline": row[1],
    "years_experience": row[2],
    "notice_period": row[3],
    "salary_min": row[4],
    "salary_max": row[5],
    "open_to_work": bool(row[6]),

    "recruiter_response_rate": row[7],
    "github_activity_score": row[8],
    "interview_completion_rate": row[9],
    "offer_acceptance_rate": row[10],
    "profile_completeness": row[11],
    "last_active_date": row[12],
    "willing_to_relocate": bool(row[13]),
    "verified_email": bool(row[14]),
    "verified_phone": bool(row[15]),
    "linkedin_connected": bool(row[16]),
    "signup_date": row[17],

"profile_views_30d": row[18],

"applications_30d": row[19],

"connection_count": row[20],

"endorsements_received": row[21],

"preferred_work_mode": row[22],

"search_appearance_30d": row[23],

"saved_by_recruiters_30d": row[24],

"skill_assessment_scores": json.loads(row[25]),
}

    def get_candidates(
        self,
        vector_ids: list[int],
    ) -> list[dict]:
        """
        Retrieve multiple candidates.
        """

        results = []

        for vector_id in vector_ids:

            candidate = self.get_candidate(vector_id)

            if candidate is not None:
                results.append(candidate)

        return results