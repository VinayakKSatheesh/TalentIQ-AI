import { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Alert,
  Box,
  Snackbar,
} from "@mui/material";

import MuiAlert from "@mui/material/Alert";

import SearchBar from "../components/SearchBar";
import CandidateCard from "../components/CandidateCard";
import CandidateDialog from "../components/CandidateDialog";
import DashboardStats from "../components/DashboardStats";
import EmptyState from "../components/EmptyState";

import api from "../api/talentiq";

import type { Candidate } from "../types/search";

function Dashboard() {
  const [results, setResults] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedCandidate, setSelectedCandidate] =
    useState<Candidate | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<"success" | "error">("success");

  const handleSearch = async (
    query: string,
    topK: number,
    minExperience: number | null,
    maxNotice: number | null,
    openToWork: boolean,
    analyze: boolean
  ) => {
    try {
      setLoading(true);

      const response = await api.post("/search", {
        query,
        top_k: topK,
        analyze,
        min_experience: minExperience,
        max_notice_period: maxNotice,
        open_to_work: openToWork,
      });

      setResults(response.data.results);

      setSnackbarSeverity("success");
      setSnackbarMessage(
        `Found ${response.data.results.length} candidate(s).`
      );
      setSnackbarOpen(true);

    } 
    catch (error: any) {
  console.error("FULL ERROR:", error);

  if (error.response) {
    console.log("Status:", error.response.status);
    console.log("Data:", error.response.data);
  }

  setSnackbarSeverity("error");
  setSnackbarMessage(
    error.response?.data?.detail ??
    error.message ??
    "Unable to connect to the server."
  );

  setSnackbarOpen(true);
}

    
     finally {
      setLoading(false);
    }
  };

  const handleViewProfile = (
    candidate: Candidate
  ) => {
    setSelectedCandidate(candidate);
    setDialogOpen(true);
  };

return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700 }}
          >
            TalentIQ AI
          </Typography>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="lg"
        sx={{ mt: 4 }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 5,
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
            }}
          >
            Recruiter Dashboard
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            AI-powered candidate search
          </Typography>

          <Box sx={{ mt: 4 }}>
            <SearchBar
              onSearch={handleSearch}
              loading={loading}
            />
          </Box>
                    {results.length > 0 && (
            <DashboardStats results={results} />
          )}

          <Alert
            severity="info"
            sx={{
              mt: 3,
              borderRadius: 2,
            }}
          >
            AI insights are automatically generated for the top 5 ranked
            candidates to ensure faster search results. Additional candidates
            can be analyzed on demand.
          </Alert>

          <Box sx={{ mt: 4 }}>
            {results.length > 0 && (
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                }}
              >
                Showing Top {results.length} Ranked Candidates
              </Typography>
            )}

            {results.length === 0 && !loading ? (
              <EmptyState />
            ) : (
              results.map((candidate) => (
                <CandidateCard
                  key={candidate.candidate_id}
                  candidate={candidate}
                  onViewProfile={handleViewProfile}
                />
              ))
            )}
          </Box>
        </Paper>

        <CandidateDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          candidate={selectedCandidate}
        />
      </Container>
            <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MuiAlert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default Dashboard;