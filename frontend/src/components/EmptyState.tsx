import SearchOffIcon from "@mui/icons-material/SearchOff";
import { Box, Typography } from "@mui/material";

function EmptyState() {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 8,
      }}
    >
      <SearchOffIcon
        color="disabled"
        sx={{
          fontSize: 80,
          mb: 2,
        }}
      />

      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 1,
        }}
      >
        No Candidates Found
      </Typography>

      <Typography color="text.secondary">
        Try changing your search query or filters.
      </Typography>
    </Box>
  );
}

export default EmptyState;