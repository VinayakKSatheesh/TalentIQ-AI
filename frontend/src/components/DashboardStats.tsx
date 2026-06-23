import {
  Box,
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
  const total = results.length;

  const analysed = results.filter(
    (c) => c.ai_analysis
  ).length;

  const open = results.filter(
    (c) => c.open_to_work
  ).length;

  const average =
    total === 0
      ? 0
      : (
          results.reduce(
            (sum, c) => sum + c.final_score,
            0
          ) / total
        ) * 100;

  const cards = [
    {
      title: "Candidates",
      value: total,
      icon: <GroupsIcon color="primary" />,
    },
    {
      title: "AI Analysed",
      value: analysed,
      icon: <PsychologyIcon color="secondary" />,
    },
    {
      title: "Average Match",
      value: `${average.toFixed(1)}%`,
      icon: <StarIcon color="warning" />,
    },
    {
      title: "Open to Work",
      value: open,
      icon: <WorkIcon color="success" />,
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          md: "repeat(4, 1fr)",
        },
        gap: 3,
        mb: 4,
      }}
    >
      {cards.map((card) => (
        <Paper
          key={card.title}
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            textAlign: "center",
            transition: "0.25s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: 8,
            },
          }}
        >
          {card.icon}

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mt: 1,
            }}
          >
            {card.value}
          </Typography>

          <Typography color="text.secondary">
            {card.title}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}

export default DashboardStats;