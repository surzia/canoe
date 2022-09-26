import * as React from "react";
import { IconButton, Toolbar, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";

import StoryBook from "../components/StoryBook";
import { State, StoryProps } from "../conf/type";
import StoryBoard from "../components/StoryBoard";

function Story({ mode, changeMode, value, handleStoryChange }: StoryProps) {
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <IconButton onClick={changeMode}>
          {mode === State.ReadMode ? <EditIcon /> : <SaveIcon />}
        </IconButton>
        <Typography
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        ></Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Toolbar>
      {mode === State.ReadMode ? (
        <StoryBoard value={value} />
      ) : (
        <StoryBook
          placeholder="记录这一刻"
          focused
          fullWidth
          multiline
          value={value}
          onChange={handleStoryChange}
        />
      )}
    </React.Fragment>
  );
}

export default Story;
