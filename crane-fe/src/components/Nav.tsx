import * as React from "react";
import { Fade, IconButton, Input, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import CloudIcon from "@mui/icons-material/Cloud";
import EditIcon from "@mui/icons-material/Edit";
import GitHubIcon from "@mui/icons-material/GitHub";
import HomeIcon from "@mui/icons-material/Home";
import ImageIcon from "@mui/icons-material/Image";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";

import { useAppDispatch } from "../store/hooks";
import { ColorModeContext } from "../App";
import { github, goto } from "../common";
import CraneIcon from "../logos/Logo";
import ev from "../ev";
import Sync from "./Sync";
import { addStory, updateStory } from "../store/story/reducer";

function Nav({ page, id }: NavProps) {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [checked, setChecked] = React.useState<boolean>(false);
  const [keyword, setKeyword] = React.useState<string>("");
  const dispatch = useAppDispatch();

  const searchKeyDownHandler = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "k") {
      event.preventDefault();
      setChecked(!checked);
    }
  };

  const addStoryKeyDownHandler = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "a") {
      event.preventDefault();
      goto("/edit");
    }
  };

  const editStoryKeyDownHandler = (event: KeyboardEvent) => {
    if (page !== "view") {
      return;
    }
    if (event.ctrlKey && event.key === "e") {
      event.preventDefault();
      goto("/edit?sid=" + id);
    }
  };

  const saveStoryKeyDownHandler = (event: KeyboardEvent) => {
    if (page !== "story") {
      return;
    }
    if (event.ctrlKey && event.key === "s") {
      event.preventDefault();
      if (id === null || id === "null" || id === undefined || id === "") {
        dispatch(addStory());
      } else {
        dispatch(updateStory(id));
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", addStoryKeyDownHandler);
    window.addEventListener("keydown", editStoryKeyDownHandler);
    window.addEventListener("keydown", saveStoryKeyDownHandler);
    window.addEventListener("keydown", searchKeyDownHandler);
  });

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        {page === "home" && (
          <React.Fragment>
            <IconButton onClick={() => goto("/edit")}>
              <AddCircleIcon />
            </IconButton>
            <IconButton onClick={() => goto("/img")}>
              <ImageIcon />
            </IconButton>
          </React.Fragment>
        )}
        {page === "image" && (
          <React.Fragment>
            <IconButton onClick={() => goto("/")}>
              <HomeIcon />
            </IconButton>
            <IconButton onClick={() => goto("/edit")}>
              <AddCircleIcon />
            </IconButton>
          </React.Fragment>
        )}
        {page === "story" && (
          <React.Fragment>
            <IconButton onClick={() => goto("/")}>
              <HomeIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                if (
                  id === null ||
                  id === "null" ||
                  id === undefined ||
                  id === ""
                ) {
                  dispatch(addStory());
                } else {
                  dispatch(updateStory(id));
                }
              }}
            >
              <SaveIcon />
            </IconButton>
          </React.Fragment>
        )}
        {page === "view" && (
          <React.Fragment>
            <IconButton onClick={() => goto("/")}>
              <HomeIcon />
            </IconButton>
            <IconButton onClick={() => goto("/img")}>
              <ImageIcon />
            </IconButton>
            <IconButton onClick={() => goto("/edit")}>
              <AddCircleIcon />
            </IconButton>
            <IconButton onClick={() => goto("/edit?sid=" + id)}>
              <EditIcon />
            </IconButton>
          </React.Fragment>
        )}
        <IconButton onClick={() => ev.emit("toggleSyncSetting", true)}>
          <CloudIcon />
        </IconButton>

        <Typography color="inherit" align="center" noWrap sx={{ flex: 1 }}>
          <CraneIcon />
        </Typography>
        <Fade in={checked}>
          <Input
            type="text"
            size="small"
            placeholder="从这里搜索"
            sx={checked ? {} : { display: "none" }}
            value={keyword}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setKeyword(event.target.value)
            }
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (event.key === "Enter") {
                ev.emit("searchStory", keyword);
              }
            }}
          />
        </Fade>
        <IconButton onClick={() => setChecked(!checked)}>
          <SearchIcon />
        </IconButton>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
        <IconButton onClick={() => github()}>
          <GitHubIcon />
        </IconButton>
      </Toolbar>

      <Sync />
    </React.Fragment>
  );
}

export default Nav;
