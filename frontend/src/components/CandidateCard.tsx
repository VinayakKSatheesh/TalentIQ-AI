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
import Avatar from "@mui/material/Avatar";
import type { Candidate } from "../types/search";
import { useNavigate } from "react-router-dom";

interface Props {
  candidate: Candidate;

}

function CandidateCard({
  candidate,
}: Props) {
  const navigate = useNavigate();
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
      <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
  }}
>
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 2,
      
    }}
  >
    <Avatar
      sx={{
        bgcolor: "#1976D2",
        width: 56,
        height: 56,
        fontWeight: 700,
      }}
    >
      {candidate.headline
        .split(" ")
        .slice(0, 2)
        .map((w: string) => w[0])
        .join("")}
    </Avatar>

    <Box
  sx={{
    flex: 1,
    textAlign: "center",
  }}
>
  <Typography
    variant="h5"
    sx={{
      fontWeight: 700,
      mb: 0.5,
    }}
  >
    {candidate.headline}
  </Typography>

  <Typography
    color="text.secondary"
    sx={{
      mb: 1,
      fontSize: "0.95rem",
    }}
  >
    Candidate ID: {candidate.candidate_id}
  </Typography>

  <Chip
    label={
      candidate.final_score >= 0.9
        ? "Excellent Match"
        : candidate.final_score >= 0.75
        ? "Strong Match"
        : "Good Match"
    }
    color={
      candidate.final_score >= 0.9
        ? "success"
        : candidate.final_score >= 0.75
        ? "primary"
        : "warning"
    }
    sx={{
      fontWeight: 700,
      px: 1,
    }}
  />
</Box>
  </Box>
  </Box>      

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
    height:12,
borderRadius:6,
"& .MuiLinearProgress-bar": {
  borderRadius: 6,
},
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

    <Box
  sx={{
    p: 2,
    backgroundColor: "#F5F9FF",
    borderLeft: "5px solid #1976D2",
    borderRadius: 2,
    mb: 3,
  }}
>
  <Typography>
    {candidate.ai_analysis.recommendation}
  </Typography>
</Box>
      
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
    onClick={() =>
        navigate(
            `/candidate/${candidate.candidate_id}`,
            {
                state: {
                    similarity_score: candidate.similarity_score,
                    business_score: candidate.business_score,
                    final_score: candidate.final_score,
                },
            }
        )
    }
>
    Open Profile
</Button>
    </Box>
  </>
)}
      </CardContent>
    </Card>
  );
}

export default CandidateCard;