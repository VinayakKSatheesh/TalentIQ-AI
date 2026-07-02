import { Box } from "@mui/material";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CandidateProfile from "./pages/CandidateProfile";

function App() {
  return (
    <BrowserRouter>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#F4F8FC",
        }}
      >
        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/candidate/:candidateId"
            element={<CandidateProfile />}
          />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;