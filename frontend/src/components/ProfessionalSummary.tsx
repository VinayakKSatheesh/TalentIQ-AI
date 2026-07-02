import { Paper, Typography } from "@mui/material";
import type { CandidateProfile } from "../types/profile";

interface Props {
  candidate: CandidateProfile;
}

function ProfessionalSummary({ candidate }: Props) {
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
        sx={{ fontWeight: 700, mb: 2 }}
      >
        Professional Summary
      </Typography>

      <Typography color="text.secondary">
        {candidate.profile.summary}
      </Typography>
    </Paper>
  );
}

export default ProfessionalSummary;