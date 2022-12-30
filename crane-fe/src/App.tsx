import * as React from "react";
import { Routes, Route } from "react-router-dom";

// MUI dependencies
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";

// Internal dependencies
import Story from "./pages/Story";
import HomePage from "./pages/HomePage";
import View from "./pages/View";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function App() {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container
          maxWidth="lg"
          sx={{
            bgcolor: "background.default",
            "& .story": {
              py: 3,
            },
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/story" element={<Story />} />
            <Route path="/view/:id" element={<View />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
