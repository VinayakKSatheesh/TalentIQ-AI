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

function SkillsSection({ candidate }: Props) {
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
        Skills
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Stack
        direction="row"
        spacing={1}
        useFlexGap
        sx={{
          flexWrap: "wrap",
        }}
      >
        {candidate.skills.length === 0 ? (
          <Typography color="text.secondary">
            No skills available.
          </Typography>
        ) : (
          candidate.skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill.name ?? "Unknown Skill"}
              color="primary"
            />
          ))
        )}
      </Stack>
    </Paper>
  );
}

export default SkillsSection;