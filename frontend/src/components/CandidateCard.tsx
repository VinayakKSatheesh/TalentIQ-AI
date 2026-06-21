import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
} from "@mui/material";

import type { Candidate } from "../types/search";

interface Props {
  candidate: Candidate;
}

function CandidateCard({ candidate }: Props) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>

        <Typography variant="h6">
          {candidate.headline}
        </Typography>

        <Typography color="text.secondary">
          {candidate.candidate_id}
        </Typography>

        <Stack
    direction="row"
    spacing={3}
    useFlexGap
    sx={{
        alignItems: "center",
        flexWrap: "wrap",
    }}
>
          <Chip
            label={`${candidate.years_experience} Years`}
            color="primary"
          />

          <Chip
            label={`Score ${candidate.final_score}`}
            color="success"
          />

          {candidate.open_to_work && (
            <Chip
              label="Open to Work"
              color="warning"
            />
          )}
        </Stack>

        {candidate.ai_analysis && (
          <>
            <Typography
                variant="subtitle1"
                sx={{
                    fontWeight: 700,
                    mt: 2,
                    mb: 1,
                }}
            >
                🤖 AI Recommendation
            </Typography>

            <Typography>
              {candidate.ai_analysis.recommendation}
            </Typography>
          </>
        )}

      </CardContent>
    </Card>
  );
}

export default CandidateCard;