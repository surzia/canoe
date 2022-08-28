import React, { Component } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      created: "",
      content: "",
    };
  }

  componentDidMount() {
    let viewId = this.props.match.params.id;
    fetch(`http://localhost:8000/api/view/${viewId}`)
      .then((r) => r.json())
      .then((data) => {
        this.setState({
          created: data.created,
          content: data.content,
        });
      })
      .catch((err) => {
        this.props.history.push("/404");
      });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              千纸鹤写作
            </Typography>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 2, pt: 2, pb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h6" gutterBottom>
                {this.state.created}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Button>Edit</Button>
            </Grid>
          </Grid>
          <Divider />
          <Typography variant="body1" gutterBottom>
            {this.state.content}
          </Typography>
        </Container>
      </ThemeProvider>
    );
  }
}

export default App;
