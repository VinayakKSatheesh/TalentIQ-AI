import {
  Paper,
  Typography,
  Divider,
  Stack,
} from "@mui/material";

import type { CandidateProfile } from "../types/profile";

interface Props {
  candidate: CandidateProfile;
}

function CareerHistory({ candidate }: Props) {
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
        }}
      >
        Career History
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Stack spacing={3}>
        {candidate.career_history.length === 0 ? (
          <Typography color="text.secondary">
            No career history available.
          </Typography>
        ) : (
          candidate.career_history.map((job, index) => (
            <Paper
              key={index}
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 2,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                }}
              >
                {job.title ?? "Unknown Role"}
              </Typography>

              <Typography color="text.secondary">
                {job.company ?? "Unknown Company"}
              </Typography>

              <Typography
                variant="body2"
                sx={{ mt: 1 }}
              >
                {job.start_date} - {job.end_date ?? "Present"}
              </Typography>

              <Typography sx={{ mt: 2 }}>
                {job.description ?? "No description available."}
              </Typography>
            </Paper>
          ))
        )}
      </Stack>
    </Paper>
  );
}

export default CareerHistory;