import React from "react";
import { Routes, Route } from "react-router-dom";

// MUI dependencies
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";

// Internal dependencies
import Story from "./pages/Story";
import HomePage from "./pages/HomePage";

function App() {
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ bgcolor: "background.default" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/story" element={<Story />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
