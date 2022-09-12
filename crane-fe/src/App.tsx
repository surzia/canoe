import React from "react";
import { GlobalStyles } from "@mui/system";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import type { Theme } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import TextField from "@mui/joy/TextField";
import IconButton from "@mui/joy/IconButton";

// Icons import
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import SvgIcon from "@mui/material/SvgIcon";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";

import papercraneTheme from "./theme";
import {
  Root,
  Header,
  Main,
  SideDrawer,
  SideNav,
  SidePane,
} from "./layout/Layout";
import Navigation from "./components/Navigation";
import StoryList from "./components/StoryList";
import StoryContent from "./components/Contents";

const ColorSchemeToggle = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="primary"
      onClick={() => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
      }}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
};

export default function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <CssVarsProvider disableTransitionOnChange theme={papercraneTheme}>
      <GlobalStyles<Theme>
        styles={(theme) => ({
          body: {
            margin: 0,
            fontFamily: theme.vars.fontFamily.body,
          },
        })}
      />

      {drawerOpen && (
        <SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation />
        </SideDrawer>
      )}

      <Root
        sx={{
          ...(drawerOpen && {
            height: "100vh",
            overflow: "hidden",
          }),
        }}
      >
        <Header>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <IconButton
              variant="outlined"
              size="sm"
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              size="sm"
              variant="solid"
              sx={{ display: { xs: "none", sm: "inline-flex" } }}
            >
              <SvgIcon>
                <path d="M 5 1 L 5 1 L 0 8 L 4 7 L 5 11 L 10 6 L 10 6 L 10 6 L 10 6 L 10 6 M 5 11 L 12.5 18.5 L 12.5 18.5 L 15 21 L 15 11 M 10 16 L 22.5 3.5 M 10 6 L 5 11 L 10 16 L 22.5 3.5" />
              </SvgIcon>
            </IconButton>
            <Typography component="h1" fontWeight="xl">
              千纸鹤写作
            </Typography>
          </Box>
          <TextField
            size="sm"
            placeholder="Search anything…"
            startDecorator={<SearchRoundedIcon color="primary" />}
            endDecorator={
              <IconButton variant="outlined" size="sm" color="neutral">
                <Typography
                  fontWeight="lg"
                  fontSize="sm"
                  textColor="text.tertiary"
                >
                  /
                </Typography>
              </IconButton>
            }
            sx={{
              flexBasis: "500px",
              display: {
                xs: "none",
                sm: "flex",
              },
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5 }}>
            <IconButton
              size="sm"
              variant="outlined"
              color="primary"
              sx={{ display: { xs: "inline-flex", sm: "none" } }}
            >
              <SearchRoundedIcon />
            </IconButton>
            <IconButton
              size="sm"
              variant="outlined"
              color="primary"
              component="a"
              href="https://github.com/surzia/papercrane"
            >
              <GitHubIcon />
            </IconButton>
            <ColorSchemeToggle />
          </Box>
        </Header>

        <SideNav>
          <Navigation />
        </SideNav>

        <SidePane>
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              textColor="neutral.500"
              fontWeight={700}
              sx={{
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: ".1rem",
              }}
            >
              你的story
            </Typography>
            <IconButton
              size="sm"
              variant="plain"
              color="primary"
              sx={{ "--IconButton-size": "24px" }}
            >
              <AddOutlinedIcon fontSize="small" color="primary" />
            </IconButton>
          </Box>
          <StoryList />
        </SidePane>
        <Main>
          <StoryContent />
        </Main>
      </Root>
    </CssVarsProvider>
  );
}
