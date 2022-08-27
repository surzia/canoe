import React, { Component } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      total: 0,
      page: 1,
      size: 9,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, value) {
    fetch(
      `http://localhost:8000/api/list?page=${value}&size=${this.state.size}`
    )
      .then((r) => r.json())
      .then((data) => {
        this.setState({
          page: value,
          cards: data.results,
        });
      });
  }

  componentDidMount() {
    fetch(
      `http://localhost:8000/api/list?page=${this.state.page}&size=${this.state.size}`
    )
      .then((r) => r.json())
      .then((data) => {
        this.setState({
          total: Math.ceil(data.count / this.state.size),
          cards: data.results,
        });
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
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                千纸鹤写作
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                随时随地，随意写作
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button variant="contained">记录现在</Button>
                <Button variant="outlined">浏览所有</Button>
              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 4 }}>
            {/* End hero unit */}
            <Grid container spacing={4}>
              {this.state.cards.map((card) => (
                <Grid item key={card.uid} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* <CardMedia
                      component="img"
                      sx={{
                        // 16:9
                        pt: "56.25%",
                      }}
                      image="https://source.unsplash.com/random"
                      alt="random"
                    /> */}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.created}
                      </Typography>
                      <Typography>{card.content}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">View</Button>
                      <Button size="small">Edit</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
          <Stack spacing={2} alignItems="center">
            <Pagination
              count={this.state.total}
              page={this.state.page}
              variant="outlined"
              color="primary"
              onChange={this.handleChange}
            />
          </Stack>
        </main>
        {/* Footer */}
        <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
              papercrane
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
        {/* End footer */}
      </ThemeProvider>
    );
  }
}

export default App;
