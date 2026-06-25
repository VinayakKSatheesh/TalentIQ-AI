import jsPDF from "jspdf";
import type { Candidate } from "../types/search";

export function exportCandidatePDF(candidate: Candidate) {
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("TalentIQ AI", 20, 20);

  doc.setFontSize(14);
  doc.text("AI Candidate Evaluation Report", 20, 30);

  doc.setDrawColor(180);
  doc.line(20, 35, 190, 35);

  let y = 45;

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  doc.text(`Candidate ID: ${candidate.candidate_id}`, 20, y);
  y += 10;

  doc.text(`Headline: ${candidate.headline}`, 20, y);
  y += 10;

  doc.text(`Experience: ${candidate.years_experience} Years`, 20, y);
  y += 10;

  doc.text(`Notice Period: ${candidate.notice_period} Days`, 20, y);
  y += 10;

  doc.text(
    `Salary: ₹${candidate.salary_min}L - ₹${candidate.salary_max}L`,
    20,
    y
  );
  y += 10;

  doc.text(
    `Open To Work: ${candidate.open_to_work ? "Yes" : "No"}`,
    20,
    y
  );
  y += 10;

  doc.text(
    `Match Score: ${(candidate.final_score * 100).toFixed(1)}%`,
    20,
    y
  );

  if (candidate.ai_analysis) {
    y += 20;

    doc.setFont("helvetica", "bold");
    doc.text("Strengths", 20, y);

    doc.setFont("helvetica", "normal");

    candidate.ai_analysis.strengths.forEach((item) => {
      y += 8;
      doc.text(`• ${item}`, 25, y);
    });

    y += 15;

    doc.setFont("helvetica", "bold");
    doc.text("Concerns", 20, y);

    doc.setFont("helvetica", "normal");

    candidate.ai_analysis.concerns.forEach((item) => {
      y += 8;
      doc.text(`• ${item}`, 25, y);
    });

    y += 15;

    doc.setFont("helvetica", "bold");
    doc.text("AI Recommendation", 20, y);

    y += 8;

    doc.setFont("helvetica", "normal");
    doc.text(
      candidate.ai_analysis.recommendation,
      20,
      y,
      {
        maxWidth: 170,
      }
    );
  }

  doc.save(`${candidate.candidate_id}.pdf`);
}