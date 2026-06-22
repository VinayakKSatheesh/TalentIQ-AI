import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Stack,
  Chip,
  Divider,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import type { Candidate } from "../types/search";

interface Props {
  open: boolean;
  onClose: () => void;
  candidate: Candidate | null;
}

function CandidateDialog({
  open,
  onClose,
  candidate,
}: Props) {
  if (!candidate) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {candidate.headline}

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>

        <Typography
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          {candidate.candidate_id}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Typography
          variant="h6"
          sx={{ mb: 1 }}
        >
          Candidate Information
        </Typography>

        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography>
            Experience: {candidate.years_experience} Years
          </Typography>

          <Typography>
            Notice Period: {candidate.notice_period} Days
          </Typography>

          <Typography>
            Salary: ₹{candidate.salary_min}L - ₹{candidate.salary_max}L
          </Typography>

          <Typography>
            Open to Work: {candidate.open_to_work ? "Yes" : "No"}
          </Typography>
        </Stack>

        {candidate.ai_analysis && (
          <>
            <Divider sx={{ mb: 3 }} />

            <Typography
              variant="h6"
              sx={{ mb: 2 }}
            >
              AI Recommendation
            </Typography>

            <Typography sx={{ mb: 3 }}>
              {candidate.ai_analysis.recommendation}
            </Typography>

            <Typography
              sx={{ fontWeight: 700,    
                    mb: 1 }}
            >
              Strengths
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{
                flexWrap: "wrap",
                mb: 3,
              }}
            >
              {candidate.ai_analysis.strengths.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  color="success"
                />
              ))}
            </Stack>

            <Typography
              sx={{ fontWeight: 700, 
                    mb: 1, }}
            >
              Concerns
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ flexWrap: "wrap" }}
            >
              {candidate.ai_analysis.concerns.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  color="warning"
                />
              ))}
            </Stack>

          </>
        )}

      </DialogContent>
    </Dialog>
  );
}

export default CandidateDialog;