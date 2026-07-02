import {
  Paper,
  Typography,
  Divider,
  Alert,
} from "@mui/material";

interface Props {
  recommendation?: string;
}

function AIAnalysisSection({
  recommendation,
}: Props) {
  return (
    <Paper
      elevation={2}
      sx={{ p: 3, borderRadius: 3 }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        AI Analysis
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Alert severity="info">
        {recommendation ??
          "AI analysis will be displayed here after recruiter analysis."}
      </Alert>
    </Paper>
  );
}

export default AIAnalysisSection;