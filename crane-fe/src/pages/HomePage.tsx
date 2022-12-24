import * as React from "react";
import { Grid, IconButton, Toolbar, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import Feed from "../components/Feed";
import Bookmark from "../components/Bookmark";

function HomePage() {
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <IconButton>
          <HomeIcon />
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
      <Grid container spacing={5} sx={{ mt: 0.1 }}>
        <Feed />
        <Bookmark />
      </Grid>
    </React.Fragment>
  );
}

export default HomePage;
