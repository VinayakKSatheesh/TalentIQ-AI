import {
  Paper,
  Typography,
  Divider,
  Stack,
  Chip,
} from "@mui/material";

import type { CandidateProfile } from "../types/profile";

interface Props {
  candidate: CandidateProfile;
}

function CertificationsSection({ candidate }: Props) {
  return (
    <Paper
      elevation={2}
      sx={{ p: 3, borderRadius: 3, mb: 3 }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Certifications
      </Typography>

      <Divider sx={{ my: 2 }} />

      {candidate.certifications.length === 0 ? (
        <Typography color="text.secondary">
          No certifications available.
        </Typography>
      ) : (
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
          {candidate.certifications.map((cert, index) => (
            <Chip
              key={index}
              label={cert.name ?? "Certification"}
              color="success"
            />
          ))}
        </Stack>
      )}
    </Paper>
  );
}

export default CertificationsSection;