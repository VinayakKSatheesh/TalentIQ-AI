import jsPDF from "jspdf";
import type { CandidateProfile } from "../types/profile";

export function exportProfilePDF(
  candidate: CandidateProfile,
  scores?: {
    similarity_score: number;
    business_score: number;
    final_score: number;
  }
) {
  const doc = new jsPDF();

  let y = 20;

  const line = (text: string, bold = false) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(text, 20, y);
    y += 8;

    if (y > 275) {
      doc.addPage();
      y = 20;
    }
  };

  // Header

  doc.setFontSize(22);
  line("TalentIQ AI", true);

  doc.setFontSize(15);
  line("Candidate Profile Report");

  y += 5;

  // Basic Info

  doc.setFontSize(13);

  line("Candidate Information", true);

  line(`Name: ${candidate.profile.anonymized_name}`);
  line(`Role: ${candidate.profile.current_title}`);
  line(`Company: ${candidate.profile.current_company}`);
  line(`Location: ${candidate.profile.location}`);
  line(`Experience: ${candidate.profile.years_of_experience} Years`);

  line(
    `Salary: ₹${candidate.redrob_signals.expected_salary_range_inr_lpa.min}L - ₹${candidate.redrob_signals.expected_salary_range_inr_lpa.max}L`
  );

  line(
    `Notice Period: ${candidate.redrob_signals.notice_period_days} Days`
  );

  if (scores) {
    y += 3;

    line("Match Scores", true);

    line(
      `Overall Match: ${(scores.final_score * 100).toFixed(1)}%`
    );

    line(
      `Semantic Score: ${(scores.similarity_score * 100).toFixed(1)}%`
    );

    line(
      `Business Score: ${(scores.business_score * 100).toFixed(1)}%`
    );
  }

  y += 5;

  // Summary

  line("Professional Summary", true);

  const summary = doc.splitTextToSize(
    candidate.profile.summary,
    170
  );

  doc.text(summary, 20, y);

  y += summary.length * 7 + 5;

  // Recruiter Intelligence

  line("Recruiter Intelligence", true);

  line(
    `Profile Completeness: ${candidate.redrob_signals.profile_completeness_score}%`
  );

  line(
    `Recruiter Response Rate: ${(
      candidate.redrob_signals.recruiter_response_rate * 100
    ).toFixed(0)}%`
  );

  line(
    `Interview Completion: ${(
      candidate.redrob_signals.interview_completion_rate * 100
    ).toFixed(0)}%`
  );

  line(
    `Offer Acceptance: ${(
      candidate.redrob_signals.offer_acceptance_rate * 100
    ).toFixed(0)}%`
  );

  y += 4;

  // Career

  line("Career History", true);

  candidate.career_history.forEach((job) => {
    line(`${job.title} - ${job.company}`, true);

    line(
      `${job.start_date} - ${job.end_date ?? "Present"}`
    );

    if (job.description) {
      const desc = doc.splitTextToSize(
        job.description,
        170
      );

      doc.text(desc, 20, y);

      y += desc.length * 6;
    }

    y += 4;
  });

  // Education

  line("Education", true);

  candidate.education.forEach((edu) => {
    line(
      `${edu.degree} - ${edu.field_of_study}`
    );

    line(
      `${edu.institution} (${edu.start_year} - ${edu.end_year})`
    );

    line(`${edu.grade}`);
  });

  // Skills

  line("Skills", true);

  line(
    candidate.skills
      .map((s) => s.name)
      .join(", ")
  );

  // Languages

  line("Languages", true);

  line(
    candidate.languages
      .map(
        (l) =>
          `${l.language} (${l.proficiency})`
      )
      .join(", ")
  );

  doc.save(
    `${candidate.candidate_id}_profile.pdf`
  );
}