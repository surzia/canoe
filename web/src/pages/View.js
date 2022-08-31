import React, { Component } from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Layout from "../layout/Layout";

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
      <Layout>
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
      </Layout>
    );
  }
}

export default App;
