import { useState } from "react";

import {
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

interface SearchBarProps {
  onSearch: (
    query: string,
    topK: number,
    minExperience: number | null,
    maxNotice: number | null,
    openToWork: boolean,
    analyze: boolean
  ) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [topK, setTopK] = useState(5);
  const [minExperience, setMinExperience] = useState<number | "">("");
  const [maxNotice, setMaxNotice] = useState<number | "">("");
  const [openToWork, setOpenToWork] = useState(false);
  const [analyze, setAnalyze] = useState(true);

  return (
    <Stack
  direction="row"
  spacing={2}
  useFlexGap
  sx={{
    alignItems: "center",
    flexWrap: "wrap",
  }}
>
      <TextField
    fullWidth
    size="medium"
    sx={{
        "& .MuiOutlinedInput-root": {
            borderRadius: 2,
        },
    }}
        label="Search Candidates"
        placeholder="Python Backend Developer..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <FormControl sx={{ minWidth: 140 }}>
        <InputLabel>Show Results</InputLabel>

        <Select
          value={topK}
          label="Show Results"
          onChange={(e) => setTopK(Number(e.target.value))}
        >
          <MenuItem value={5}>Top 5</MenuItem>
          <MenuItem value={10}>Top 10</MenuItem>
          <MenuItem value={20}>Top 20</MenuItem>
          <MenuItem value={50}>Top 50</MenuItem>
        </Select>
      </FormControl>
    <TextField
  label="Min Experience"
  type="number"
  size="small"
  sx={{ width: 150 }}
  value={minExperience}
  placeholder="Any"
  onChange={(e) =>
    setMinExperience(
      e.target.value === "" ? "" : Number(e.target.value)
    )
  }
/>

<TextField
  label="Max Notice"
  type="number"
  size="small"
  sx={{ width: 150 }}
  value={maxNotice}
  placeholder="Any"
  onChange={(e) =>
    setMaxNotice(
      e.target.value === "" ? "" : Number(e.target.value)
    )
  }
/>

<FormControlLabel
  control={
    <Checkbox
      checked={openToWork}
      onChange={(e) => setOpenToWork(e.target.checked)}
    />
  }
  label="Open to Work"
/>

<FormControlLabel
  control={
    <Checkbox
      checked={analyze}
      onChange={(e) => setAnalyze(e.target.checked)}
    />
  }
  label="AI Analysis"
/>
      <Button
    variant="contained"
    size="large"
    sx={{
        px: 5,
        height: 56,
        borderRadius: 2,
    }}

        onClick={() =>
  onSearch(
    query,
    topK,
    minExperience === "" ? null : minExperience,
    maxNotice === "" ? null : maxNotice,
    openToWork,
    analyze
  )
}
      >
        Search
      </Button>
    </Stack>
  );
}

export default SearchBar;