import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Provider } from "react-redux";

import App from "./App.tsx";
import { theme } from "./theme";
import { store } from "./store";

const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
