import * as React from "react";
import { IconButton, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";
import HomeIcon from "@mui/icons-material/Home";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import StoryBook from "../components/StoryBook";
import CraneIcon from "../components/Logo";
import { ColorModeContext } from "../App";

function Story() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const StoryBookRef = React.useRef<StoryBookProps>(null);

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <IconButton
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <HomeIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            if (StoryBookRef.current !== null) {
              StoryBookRef.current.submitStory();
            }
          }}
        >
          <SaveIcon />
        </IconButton>
        <Typography color="inherit" align="center" noWrap sx={{ flex: 1 }}>
          <CraneIcon />
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Toolbar>
      <StoryBook ref={StoryBookRef} />
    </React.Fragment>
  );
}

export default Story;
