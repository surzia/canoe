import * as React from "react";
import { Grid, IconButton, Toolbar, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Feed from "../components/Feed";
import Bookmark from "../components/Bookmark";
import CraneIcon from "../components/Logo";

function HomePage() {
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <IconButton
          onClick={() => {
            window.location.href = "/story";
          }}
        >
          <AddCircleIcon />
        </IconButton>
        <Typography color="inherit" align="center" noWrap sx={{ flex: 1 }}>
          <CraneIcon />
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Toolbar>
      <Grid container spacing={5} sx={{ mt: 0.1 }}>
        <Feed />
        <Bookmark />
      </Grid>
    </React.Fragment>
  );
}

export default HomePage;
