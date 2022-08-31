import React, { Component } from "react";
import Container from "@mui/material/Container";
import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import Layout from "../layout/Layout";
import { CssTextField } from "../components/Editor";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      exist: false,
      created: "",
      content: "",
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    const { created } = this.props;
    if (created) {
      let viewId = this.props.match.params.id;
      this.setState({
        id: viewId,
      });
      fetch(`http://localhost:8000/api/view/${viewId}`)
        .then((r) => r.json())
        .then((data) => {
          this.setState({
            exist: true,
            id: viewId,
            created: data.created,
            content: data.content,
          });
        });
    }
  }

  save() {
    if (this.state.exist) {
      const data = {
        id: this.state.id,
        content: this.state.content,
      };
      fetch("http://localhost:8000/api/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(() => {})
        .catch((error) => {
          console.error("Error:", error);
        });
      this.props.history.push(`/view/${this.state.id}`);
    } else {
      const data = {
        content: this.state.content,
      };
      fetch("http://localhost:8000/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((data) => {
          window.location.replace("/");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  handleOnChange(e) {
    this.setState({
      content: e.target.value,
    });
  }

  render() {
    return (
      <Layout>
        <Container
          className="content"
          sx={{ position: "relative", mt: 2, pt: 2, pb: 4 }}
        >
          <div sx={{ textAlgin: "center" }}>
            <CssTextField
              sx={{ width: "95%" }}
              // label={this.state.currentDateTime}
              placeholder="记录这一刻"
              focused
              multiline
              value={this.state.content}
              onChange={this.handleOnChange}
            ></CssTextField>
          </div>
        </Container>
        <Box
          sx={{
            position: "fixed",
            transform: "translateZ(0px)",
            bottom: 50,
            right: 50,
          }}
          component="footer"
        >
          <SpeedDial ariaLabel="Toolbox" icon={<SpeedDialIcon />}>
            <SpeedDialAction
              key="保存"
              icon={<SaveIcon />}
              tooltipTitle="保存"
              onClick={this.save}
            />
          </SpeedDial>
        </Box>
      </Layout>
    );
  }
}

export default App;
