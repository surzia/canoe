import React, { Component } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

class App extends Component {
  render() {
    return (
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            千纸鹤写作
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default App;
