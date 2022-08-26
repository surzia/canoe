import React, { Component } from "react";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

const theme = createTheme({});
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "gray",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    // let today = new Date();
    this.state = {
      // title: today.toISOString().split("T")[0],
      value: "",
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.save = this.save.bind(this);
  }

  save() {
    const data = {
      // title: "test",
      content: this.state.value,
    };
    fetch("http://localhost:8000/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  handleOnChange(e) {
    this.setState({
      value: e.target.value,
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
              value={this.state.value}
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
            {/* <SpeedDialAction
              key="上传"
              icon={<CloudUploadIcon />}
              tooltipTitle="上传"
              onClick={this.upload}
            />
            <SpeedDialAction
              key="下载"
              icon={<CloudDownloadIcon />}
              tooltipTitle="下载"
              onClick={this.save}
            /> */}
          </SpeedDial>
        </Box>
      </ThemeProvider>
    );
  }
}

export default App;
