from pathlib import Path
import sqlite3


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

                open_to_work INTEGER
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
            INSERT INTO candidates
            VALUES (?,?,?,?,?,?,?,?)
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
                open_to_work
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