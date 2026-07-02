import {
  Avatar,
  Box,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import type { CandidateProfile } from "../types/profile";

interface Props {
  candidate: CandidateProfile;
  scores?: {
    similarity_score: number;
    business_score: number;
    final_score: number;
  };
}

function CandidateHero({
  candidate,
  scores,
}: Props) {
  const profile = candidate.profile;
  const signals = candidate.redrob_signals;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 3,
        mb: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 4,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              width: 90,
              height: 90,
              fontSize: 32,
              fontWeight: 700,
              bgcolor: "#1976D2",
            }}
          >
            {profile.anonymized_name
              .split(" ")
              .map((w: string) => w[0])
              .join("")}
          </Avatar>

          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700 }}
            >
              {profile.anonymized_name}
            </Typography>

            <Typography
              variant="h6"
              color="primary"
            >
              {profile.current_title}
            </Typography>

            <Typography
              color="text.secondary"
            >
              {profile.current_company} • {profile.location}
            </Typography>

            <Typography
              color="text.secondary"
            >
              Candidate ID : {candidate.candidate_id}
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{
                mt: 2,
                flexWrap: "wrap",
              }}
            >
              <Chip
                color={
                  signals.open_to_work_flag
                    ? "success"
                    : "default"
                }
                label={
                  signals.open_to_work_flag
                    ? "Open To Work"
                    : "Not Open"
                }
              />

              <Chip
                color="primary"
                label={signals.preferred_work_mode}
              />

              <Chip
                color="secondary"
                label={`${profile.years_of_experience} Years`}
              />
            </Stack>
          </Box>
        </Box>

        <Box
          sx={{
            textAlign: "center",
            minWidth: 170,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: "#2E7D32",
            }}
          >
            {scores
              ? `${(scores.final_score * 100).toFixed(1)}%`
              : "--"}
          </Typography>

          <Typography color="text.secondary">
            Overall Match
          </Typography>

          {scores && (
            <>
              <Typography
                sx={{ mt: 2 }}
              >
                Semantic :
                {" "}
                {(scores.similarity_score * 100).toFixed(1)}%
              </Typography>

              <Typography>
                Business :
                {" "}
                {(scores.business_score * 100).toFixed(1)}%
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Paper>
  );
}

export default CandidateHero;