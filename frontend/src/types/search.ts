export interface AIAnalysis {
    match_score: number;
    strengths: string[];
    concerns: string[];
    recommendation: string;
}

export interface Candidate {
    candidate_id: string;
    headline: string;

    years_experience: number;
    notice_period: number;

    salary_min: number;
    salary_max: number;

    open_to_work: boolean;

    similarity_score: number;
    business_score: number;
    final_score: number;

    // ---------- Redrob Signals ----------
    recruiter_response_rate: number;
    github_activity_score: number;
    interview_completion_rate: number;
    offer_acceptance_rate: number;
    profile_completeness: number;

    last_active_date: string;

    willing_to_relocate: boolean;

    verified_email: boolean;
    verified_phone: boolean;

    linkedin_connected: boolean;

    signup_date: string;

    profile_views_30d: number;
    applications_30d: number;
    connection_count: number;
    endorsements_received: number;

    preferred_work_mode: string;

    search_appearance_30d: number;
    saved_by_recruiters_30d: number;

    skill_assessment_scores: Record<string, number>;

    ai_analysis?: AIAnalysis;
}

export interface SearchResponse {
    count: number;
    results: Candidate[];
}