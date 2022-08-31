import React, { Component } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header";

const theme = createTheme({});

class Layout extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        {this.props.children}
      </ThemeProvider>
    );
  }
}

export default Layout;
