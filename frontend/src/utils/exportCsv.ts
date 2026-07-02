import { saveAs } from "file-saver";
import type { Candidate } from "../types/search";

function buildReasoning(candidate: Candidate): string {
  const parts: string[] = [];

  parts.push(candidate.headline);

  parts.push(`${candidate.years_experience} yrs`);

  if (candidate.recruiter_response_rate !== undefined) {
    parts.push(
      `response ${(candidate.recruiter_response_rate * 100).toFixed(0)}%`
    );
  }

  if (candidate.profile_completeness !== undefined) {
    parts.push(
      `profile ${(candidate.profile_completeness).toFixed(0)}% complete`
    );
  }

  if (candidate.connection_count !== undefined) {
    parts.push(
      `${candidate.connection_count} connections`
    );
  }

  if (candidate.search_appearance_30d !== undefined) {
    parts.push(
      `${candidate.search_appearance_30d} searches`
    );
  }

  return parts.join("; ");
}
export function exportCandidatesCSV(results: Candidate[]) {
  const headers = [
    "candidate_id",
    "rank",
    "score",
    "reasoning",
  ];

  const rows = results.map((candidate, index) => [
    candidate.candidate_id,
    index + 1,
    candidate.final_score.toFixed(3),
    buildReasoning(candidate),
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      row
        .map((value) =>
          `"${String(value).replace(/"/g, '""')}"`
        )
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(
    blob,
    `TalentIQ_Ranking_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`
  );
}