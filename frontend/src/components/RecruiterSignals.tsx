import {
  Paper,
  Typography,
  Divider,
  Stack,
  LinearProgress,
  Chip,
} from "@mui/material";

import type { CandidateProfile } from "../types/profile";

interface Props {
  candidate: CandidateProfile;
}

function RecruiterSignals({ candidate }: Props) {
  const s = candidate.redrob_signals;

  const percent = (value: number) => {
    if (value <= 1) return value * 100;
    return value;
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
        mb: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 700 }}
      >
        Recruiter Intelligence
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Stack spacing={3}>

        <div>
          <Typography>Profile Completeness</Typography>

          <LinearProgress
            variant="determinate"
            value={percent(s.profile_completeness_score)}
            sx={{ mt: 1, height: 10, borderRadius: 5 }}
          />

          <Typography sx={{ mt: 1 }}>
            {percent(s.profile_completeness_score).toFixed(0)}%
          </Typography>
        </div>

        <div>
          <Typography>Recruiter Response</Typography>

          <LinearProgress
            variant="determinate"
            value={percent(s.recruiter_response_rate)}
            sx={{ mt: 1, height: 10, borderRadius: 5 }}
          />

          <Typography sx={{ mt: 1 }}>
            {percent(s.recruiter_response_rate).toFixed(0)}%
          </Typography>
        </div>

        <div>
          <Typography>Interview Completion</Typography>

          <LinearProgress
            variant="determinate"
            value={percent(s.interview_completion_rate)}
            sx={{ mt: 1, height: 10, borderRadius: 5 }}
          />

          <Typography sx={{ mt: 1 }}>
            {percent(s.interview_completion_rate).toFixed(0)}%
          </Typography>
        </div>

        <div>
          <Typography>Offer Acceptance</Typography>

          <LinearProgress
            variant="determinate"
            value={percent(s.offer_acceptance_rate)}
            sx={{ mt: 1, height: 10, borderRadius: 5 }}
          />

          <Typography sx={{ mt: 1 }}>
            {percent(s.offer_acceptance_rate).toFixed(0)}%
          </Typography>
        </div>

        <Stack direction="row" spacing={2}>
          <Chip
            color={s.verified_email ? "success" : "default"}
            label={s.verified_email ? "Verified Email" : "Email Unverified"}
          />

          <Chip
            color={s.verified_phone ? "success" : "default"}
            label={s.verified_phone ? "Verified Phone" : "Phone Unverified"}
          />
        </Stack>

      </Stack>
    </Paper>
  );
}

export default RecruiterSignals;