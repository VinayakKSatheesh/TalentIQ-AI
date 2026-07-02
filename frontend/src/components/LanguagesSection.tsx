import {
  Paper,
  Typography,
  Divider,
  Chip,
  Stack,
} from "@mui/material";

import type { CandidateProfile } from "../types/profile";

interface Props {
  candidate: CandidateProfile;
}

function LanguagesSection({ candidate }: Props) {
  return (
    <Paper
      elevation={2}
      sx={{ p: 3, borderRadius: 3, mb: 3 }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Languages
      </Typography>

      <Divider sx={{ my: 2 }} />

      {candidate.languages.length === 0 ? (
        <Typography color="text.secondary">
          No languages available.
        </Typography>
      ) : (
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
          {candidate.languages.map((lang, index) => (
            <Chip
              key={index}
              label={`${lang.language} (${lang.proficiency})`}
              color="secondary"
            />
          ))}
        </Stack>
      )}
    </Paper>
  );
}

export default LanguagesSection;