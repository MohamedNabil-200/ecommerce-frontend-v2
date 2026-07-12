import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#9c27b0",
    },
    background: {
      default: "#F8FAFC",
      paper: "#FFF",
    },
    text: {
      primary: "#111827",
    },
  },

  shape: {
    borderRadius: 12,
  },

  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
  },
});
