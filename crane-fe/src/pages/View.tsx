import * as React from "react";
import { IconButton, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import CraneIcon from "../components/Logo";
import { ColorModeContext } from "../App";
import { useParams } from "react-router-dom";
import StoryBoard from "../components/StoryBoard";
import { selectStory, viewStoryById } from "../store/story/reducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";

function View() {
  const { id } = useParams();
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const story = useAppSelector(selectStory);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    let sid = String(id);
    dispatch(viewStoryById(sid));
  });

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
        <IconButton>
          <EditIcon />
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
      <StoryBoard className="story" children={story.story.content}></StoryBoard>
    </React.Fragment>
  );
}

export default View;
