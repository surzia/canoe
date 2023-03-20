import * as React from "react";
import { Grid } from "@mui/material";

import SidePanel from "../components/Side";
import Feed from "../components/Feed";
import Nav from "../components/Nav";

function HomePage() {
  return (
    <React.Fragment>
      <Nav page="home" id=""></Nav>
      <Grid container spacing={5} sx={{ mt: 0.1 }}>
        <Feed />
        <SidePanel />
      </Grid>
    </React.Fragment>
  );
}

export default HomePage;
