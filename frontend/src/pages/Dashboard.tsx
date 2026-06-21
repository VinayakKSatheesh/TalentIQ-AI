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

import SearchBar from "../components/SearchBar";
import CandidateCard from "../components/CandidateCard";
import api from "../api/talentiq";
import type { Candidate } from "../types/search";

function Dashboard() {
  const [results, setResults] = useState<Candidate[]>([]);

  const handleSearch = async (
  query: string,
  topK: number,
  minExperience: number | null,
  maxNotice: number | null,
  openToWork: boolean,
  analyze: boolean
) => {
    try {
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
    } catch (error) {
      console.error(error);
    }
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
            <SearchBar onSearch={handleSearch} />
          </Box>

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

            {results.map((candidate) => (
              <CandidateCard
                key={candidate.candidate_id}
                candidate={candidate}
              />
            ))}
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default Dashboard;