import { saveAs } from "file-saver";
import type { Candidate } from "../types/search";

export function exportCandidatesCSV(results: Candidate[]) {
  const headers = [
    "Candidate ID",
    "Headline",
    "Experience",
    "Notice Period",
    "Salary Min",
    "Salary Max",
    "Open To Work",
    "Similarity Score",
    "Final Score",
    "Recommendation",
  ];

  const rows = results.map((candidate) => [
    candidate.candidate_id,
    candidate.headline,
    candidate.years_experience,
    candidate.notice_period,
    candidate.salary_min,
    candidate.salary_max,
    candidate.open_to_work ? "Yes" : "No",
    candidate.similarity_score,
    candidate.final_score,
    candidate.ai_analysis?.recommendation ?? "",
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(blob, `TalentIQ_Candidates_${Date.now()}.csv`);
}