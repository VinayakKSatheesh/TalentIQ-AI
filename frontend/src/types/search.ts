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
    final_score: number;
    ai_analysis?: AIAnalysis;
}

export interface SearchResponse {
    count: number;
    results: Candidate[];
}