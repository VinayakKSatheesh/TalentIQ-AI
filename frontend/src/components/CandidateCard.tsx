import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Divider,
  LinearProgress,
  Box,
  Button,
} from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";
import PaidIcon from "@mui/icons-material/Paid";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PsychologyIcon from "@mui/icons-material/Psychology";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import type { Candidate } from "../types/search";
interface Props {
  candidate: Candidate;
  onViewProfile: (candidate: Candidate) => void;
}

function CandidateCard({
  candidate,
  onViewProfile,
}: Props) {
  return (
    <Card
  elevation={4}
  sx={{
    mb: 3,
    borderRadius: 3,
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: 8,
    },
  }}
>
      <CardContent>

        <Typography
  variant="h5"
  sx={{
    fontWeight: 700,
    mb: 1,
  }}
>
  {candidate.headline}
</Typography>

<Typography
  color="text.secondary"
  sx={{ mb: 2 }}
>
  {candidate.candidate_id}
</Typography>

<Typography
  variant="subtitle2"
  sx={{
    mb: 1,
    fontWeight: 600,
  }}
>
  Match Score
</Typography>

<LinearProgress
  variant="determinate"
  value={candidate.final_score * 100}
  sx={{
    height: 10,
    borderRadius: 5,
    mb: 2,
  }}
/>

<Typography
  align="right"
  sx={{
    mb: 3,
    fontWeight: 700,
  }}
>
  {(candidate.final_score * 100).toFixed(1)}%
</Typography>

<Stack
  direction="row"
  spacing={2}
  sx={{
    flexWrap: "wrap",
    mb: 2,
  }}
  useFlexGap
>
  <Chip
    icon={<WorkIcon />}
    label={`${candidate.years_experience} Years`}
    color="primary"
  />

  <Chip
    icon={<PaidIcon />}
    label={`₹${candidate.salary_min}L - ₹${candidate.salary_max}L`}
    color="success"
  />

  <Chip
    icon={<ScheduleIcon />}
    label={`${candidate.notice_period} Days`}
    color="secondary"
  />

  {candidate.open_to_work && (
    <Chip
      label="Open to Work"
      color="warning"
    />
  )}
</Stack>
<Divider sx={{ my: 3 }} />
        {candidate.ai_analysis && (
  <>
    <Typography
      variant="h6"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        mb: 2,
        fontWeight: 700,
      }}
    >
      <PsychologyIcon color="primary" />
      AI Recommendation
    </Typography>

    <Typography sx={{ mb: 2 }}>
      {candidate.ai_analysis.recommendation}
    </Typography>

    <Typography
      sx={{
        fontWeight: 700,
        mb: 1,
      }}
    >
      Strengths
    </Typography>

    <Stack
  direction="row"
  spacing={1}
  useFlexGap
  sx={{
    flexWrap: "wrap",
    mb: 2,
  }}
>
      {candidate.ai_analysis.strengths.map((item) => (
        <Chip
          key={item}
          icon={<CheckCircleIcon />}
          label={item}
          color="success"
          variant="outlined"
        />
      ))}
    </Stack>

    <Typography
      sx={{
        fontWeight: 700,
        mb: 1,
      }}
    >
      Concerns
    </Typography>

    <Stack
      direction="row"
      spacing={1}
      sx={{
    flexWrap: "wrap",
    mb: 2,
  }}
      useFlexGap
    >
      {candidate.ai_analysis.concerns.map((item) => (
        <Chip
          key={item}
          icon={<WarningAmberIcon />}
          label={item}
          color="warning"
          variant="outlined"
        />
      ))}
    </Stack>

    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        mt: 3,
      }}
    >
      <Button
    variant="contained"
    size="medium"
    onClick={() => onViewProfile(candidate)}
>
    View Full Profile
</Button>
    </Box>
  </>
)}
      </CardContent>
    </Card>
  );
}

export default CandidateCard;