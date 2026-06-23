import { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Alert,
  Box,
} from "@mui/material";
import CandidateDialog from "../components/CandidateDialog";
import SearchBar from "../components/SearchBar";
import CandidateCard from "../components/CandidateCard";
import api from "../api/talentiq";
import type { Candidate } from "../types/search";
import DashboardStats from "../components/DashboardStats";
import EmptyState from "../components/EmptyState";
function Dashboard() {
  const [results, setResults] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCandidate, setSelectedCandidate] =
    useState<Candidate | null>(null);

const [dialogOpen, setDialogOpen] =
    useState(false);
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


      console.log(response.data.results);

      setResults(response.data.results);
      setLoading(false);
    } 
    catch (error) {
    console.error(error);

} finally {
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

      <Container maxWidth="lg" sx={{ mt: 4 }}>
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
    AI insights are automatically generated for the top 5 ranked candidates
    to ensure faster search results. Additional candidates can be analyzed
    on demand.
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
    </>
  );
}

export default Dashboard;