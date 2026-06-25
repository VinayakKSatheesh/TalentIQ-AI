import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#1976D2",
    },

    secondary: {
      main: "#42A5F5",
    },

    success: {
      main: "#2E7D32",
    },

    warning: {
      main: "#FB8C00",
    },

    error: {
      main: "#D32F2F",
    },

    background: {
      default: "#F4F8FC",
      paper: "#FFFFFF",
    },
  },

  shape: {
    borderRadius: 12,
  },

  typography: {
    fontFamily: `"Inter","Roboto","Arial",sans-serif`,

    h3: {
      fontWeight: 800,
    },

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 700,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
});

export default theme;