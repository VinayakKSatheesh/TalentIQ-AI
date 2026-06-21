from app.ranking.scorer import CandidateScorer

candidate = {
    "similarity_score": 0.69,
    "years_experience": 7.5,
    "notice_period": 30,
    "open_to_work": True,
}

scorer = CandidateScorer()

print(
    scorer.score(candidate)
)