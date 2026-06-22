import {
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import GroupsIcon from "@mui/icons-material/Groups";
import PsychologyIcon from "@mui/icons-material/Psychology";
import StarIcon from "@mui/icons-material/Star";
import WorkIcon from "@mui/icons-material/Work";

import type { Candidate } from "../types/search";

interface Props {
  results: Candidate[];
}

function DashboardStats({ results }: Props) {
  const totalCandidates = results.length;

  const aiAnalyzed = results.filter(
    (c) => c.ai_analysis
  ).length;

  const openToWork = results.filter(
    (c) => c.open_to_work
  ).length;

  const avgMatch =
    results.length === 0
      ? 0
      : (
          results.reduce(
            (sum, c) => sum + c.final_score,
            0
          ) /
          results.length
        ) * 100;

  const stats = [
    {
      title: "Candidates",
      value: totalCandidates,
      icon: <GroupsIcon color="primary" />,
    },
    {
      title: "AI Analysed",
      value: aiAnalyzed,
      icon: <PsychologyIcon color="secondary" />,
    },
    {
      title: "Avg Match",
      value: `${avgMatch.toFixed(1)}%`,
      icon: <StarIcon color="warning" />,
    },
    {
      title: "Open to Work",
      value: openToWork,
      icon: <WorkIcon color="success" />,
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {stats.map((stat) => (
        <Grid
          key={stat.title}
          size={{ xs: 12, sm: 6, md: 3 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              textAlign: "center",
            }}
          >
            {stat.icon}

            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mt: 1,
              }}
            >
              {stat.value}
            </Typography>

            <Typography
              color="text.secondary"
            >
              {stat.title}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default DashboardStats;