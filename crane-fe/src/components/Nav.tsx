import * as React from "react";
import { Fade, IconButton, Input, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import EditIcon from "@mui/icons-material/Edit";
import HomeIcon from "@mui/icons-material/Home";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";

import { ColorModeContext } from "../App";
import { goto } from "../common";
import CraneIcon from "../components/Logo";

function Nav({ page, id, refer }: NavProps) {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [checked, setChecked] = React.useState(false);

  return (
    <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
      {page === "home" && (
        <IconButton onClick={() => goto("/edit")}>
          <AddCircleIcon />
        </IconButton>
      )}
      {page === "story" && (
        <React.Fragment>
          <IconButton onClick={() => goto("/")}>
            <HomeIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              if (refer.current !== null) {
                refer.current.submitStory();
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
          <IconButton onClick={() => goto("/edit")}>
            <AddCircleIcon />
          </IconButton>
          <IconButton onClick={() => goto("/edit?sid=" + id)}>
            <EditIcon />
          </IconButton>
        </React.Fragment>
      )}
      {page === "search" && (
        <React.Fragment>
          <IconButton onClick={() => goto("/")}>
            <HomeIcon />
          </IconButton>
          <IconButton onClick={() => goto("/edit")}>
            <AddCircleIcon />
          </IconButton>
        </React.Fragment>
      )}

      <Typography color="inherit" align="center" noWrap sx={{ flex: 1 }}>
        <CraneIcon />
      </Typography>
      <Fade in={checked}>
        <Input type="text" size="small" placeholder="从这里搜索" />
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
    </Toolbar>
  );
}

export default Nav;
