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

function EducationSection({ candidate }: Props) {
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
        Education
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Stack spacing={2}>
        {candidate.education.length === 0 ? (
          <Typography color="text.secondary">
            No education available.
          </Typography>
        ) : (
          candidate.education.map((edu, index) => (
            <Paper
              key={index}
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 2,
              }}
            >
              <Typography sx={{ fontWeight: 700 }}>
                {edu.degree ?? "Unknown Degree"}
              </Typography>

              <Typography color="text.secondary">
                {edu.institution ?? "Unknown Institution"}
              </Typography>

              <Typography variant="body2">
  {edu.start_year} - {edu.end_year}
</Typography>

<Typography sx={{ mt: 1 }}>
  {edu.field_of_study}
</Typography>

<Typography variant="body2" color="text.secondary">
  {edu.grade} • {edu.tier}
</Typography>
            </Paper>
          ))
        )}
      </Stack>
    </Paper>
  );
}

export default EducationSection;