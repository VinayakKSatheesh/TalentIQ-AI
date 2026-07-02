import {
  Paper,
  Typography,
  Divider,
  Grid,
  Box,
} from "@mui/material";

import type { CandidateProfile } from "../types/profile";

interface Props {
  candidate: CandidateProfile;
}

function CandidateOverview({ candidate }: Props) {
  const signals = candidate.redrob_signals;

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
        sx={{
          fontWeight: 700,
          mb: 2,
        }}
      >
        Overview
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Typography color="text.secondary">
              Experience
            </Typography>

            <Typography
  sx={{
    fontWeight: 600,
  }}
>
              {candidate.profile.years_of_experience} Years
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Typography color="text.secondary">
              Expected Salary
            </Typography>

            <Typography
  sx={{
    fontWeight: 600,
  }}
>
              ₹
              {signals.expected_salary_range_inr_lpa.min}
              L -
              ₹
              {signals.expected_salary_range_inr_lpa.max}
              L
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Typography color="text.secondary">
              Notice Period
            </Typography>

            <Typography
  sx={{
    fontWeight: 600,
  }}
>
              {signals.notice_period_days} Days
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Typography color="text.secondary">
              Work Mode
            </Typography>

            <Typography
  sx={{
    fontWeight: 600,
  }}
>
              {signals.preferred_work_mode}
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Typography color="text.secondary">
              Open To Work
            </Typography>

            <Typography
  sx={{
    fontWeight: 600,
  }}
>
              {signals.open_to_work_flag ? "Yes" : "No"}
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Typography color="text.secondary">
              Willing To Relocate
            </Typography>

            <Typography
  sx={{
    fontWeight: 600,
  }}
>
              {signals.willing_to_relocate ? "Yes" : "No"}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CandidateOverview;