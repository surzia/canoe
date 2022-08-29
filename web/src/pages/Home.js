import React, { Component } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Entry from "../components/Entry";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "@mui/material/Link";

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
        <Header />
        <main>
          <Entry />
          <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom id="title">
              全部归档
            </Typography>
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
                      <Button size="small">
                        <Link
                          href={"/view/" + card.id}
                          color="inherit"
                          underline="none"
                        >
                          View
                        </Link>
                      </Button>
                      <Button size="small">
                        <Link
                          href={"/page/" + card.id}
                          color="inherit"
                          underline="none"
                        >
                          Edit
                        </Link>
                      </Button>
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
        <Footer />
      </ThemeProvider>
    );
  }
}

export default App;
