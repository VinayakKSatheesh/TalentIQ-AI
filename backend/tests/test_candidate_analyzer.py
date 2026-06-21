from app.llm.candidate_analyzer import CandidateAnalyzer

candidate = {
    "candidate_id": "CAND_001",
    "headline": "Python Backend Developer",
    "years_experience": 6,
    "notice_period": 30,
    "salary_min": 15,
    "salary_max": 20,
    "open_to_work": True,
    "similarity_score": 0.91,
    "final_score": 0.95,
}

analyzer = CandidateAnalyzer()

analysis = analyzer.analyze(
    query="Python Backend Developer with FastAPI",
    candidate=candidate,
)

print(analysis)