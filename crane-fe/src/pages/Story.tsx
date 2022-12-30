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

import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addStory,
  selectStory,
  viewStoryById,
  writingStory,
  updateStory,
} from "../store/story/reducer";
import { useSearchParams } from "react-router-dom";

function Story() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const story = useAppSelector(selectStory);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const sid = searchParams.get("sid");

  React.useEffect(() => {
    if (sid === null || sid === undefined || sid === "") {
      return;
    }
    dispatch(viewStoryById(String(sid)));
  }, [sid, dispatch]);

  const handleStoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(writingStory(event.target.value));
  };

  const submitStory = () => {
    if (sid === null || sid === undefined || sid === "") {
      dispatch(addStory());
    } else {
      dispatch(updateStory(sid));
    }
  };

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
        <IconButton onClick={submitStory}>
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
      <StoryBook
        placeholder="记录这一刻"
        focused
        fullWidth
        multiline
        value={story.story.content}
        onChange={handleStoryChange}
      />
    </React.Fragment>
  );
}

export default Story;
