import { exportProfilePDF } from "../utils/exportProfilePdf";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import {
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";

import CandidateHero from "../components/CandidateHero";
import { getCandidateProfile } from "../api/talentiq";

import type { CandidateProfile as CandidateProfileType } from "../types/profile";
import CandidateOverview from "../components/CandidateOverview";
import RecruiterSignals from "../components/RecruiterSignals";
import CareerHistory from "../components/CareerHistory";
import EducationSection from "../components/EducationSection";
import SkillsSection from "../components/SkillsSection";
import CertificationsSection from "../components/CertificationsSection";
import LanguagesSection from "../components/LanguagesSection";
import AIAnalysisSection from "../components/AIAnalysisSection";
import ProfessionalSummary from "../components/ProfessionalSummary";
function CandidateProfile() {
  const { candidateId } = useParams();

  const navigate = useNavigate();

  const location = useLocation();

  const scores = location.state as
    | {
        similarity_score: number;
        business_score: number;
        final_score: number;
      }
    | undefined;

  const [candidate, setCandidate] =
    useState<CandidateProfileType | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    if (!candidateId) return;

    const loadCandidate = async () => {
      try {
        setLoading(true);

        const data = await getCandidateProfile(candidateId);

        setCandidate(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load candidate profile.");
      } finally {
        setLoading(false);
      }
    };

    loadCandidate();
  }, [candidateId]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !candidate) {
    return (
      <Box sx={{ p: 5 }}>
        <Typography color="error">
          {error || "Candidate not found."}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#F4F8FC",
        minHeight: "100vh",
      }}
    >
      {/* Header */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Back to Search
        </Button>

        <Button
  variant="contained"
  color="error"
  startIcon={<PictureAsPdfIcon />}
  onClick={() => exportProfilePDF(candidate, scores)}
>
  Download PDF
</Button>
      </Box>

      {/* Hero */}

      <CandidateHero
    candidate={candidate}
    scores={scores}
/>

<ProfessionalSummary
    candidate={candidate}
/>
      
      {/* Overview */}

     
        <Grid container spacing={3} sx={{ mb: 3 }}>
  <Grid size={{ xs: 12, lg: 6 }}>
    <CandidateOverview candidate={candidate} />
  </Grid>

  <Grid size={{ xs: 12, lg: 6 }}>
    <RecruiterSignals candidate={candidate} />
  </Grid>
</Grid>
    

      

      {/* Career History */}

      <CareerHistory candidate={candidate} />

      {/* Education */}

      <EducationSection candidate={candidate} />

      {/* Skills */}

      <SkillsSection candidate={candidate} />

      {/* AI Analysis */}

        <CertificationsSection candidate={candidate} />

        <LanguagesSection candidate={candidate} />

        <AIAnalysisSection />
    </Box>
  );
}

export default CandidateProfile;