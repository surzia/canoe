import * as React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import ToggleColorMode from "./ToggleColorMode";

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100dvw",
        position: "fixed",
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: "background.default",
          "& .Mui-selected": {
            pointerEvents: "none",
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: "20px", mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default function Checkout() {
  const [mode, setMode] = React.useState("light");
  const defaultTheme = createTheme({ palette: { mode } });
  const [count, setCount] = React.useState(0);
  const [active, setActive] = React.useState(1);
  const [no, setNo] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [size] = React.useState(40);
  const [questionText, setQuestionText] = React.useState("");
  const [optionA, setOptionA] = React.useState("");
  const [optionB, setOptionB] = React.useState("");
  const [optionC, setOptionC] = React.useState("");
  const [optionD, setOptionD] = React.useState("");
  const [answer, setAnswer] = React.useState("");

  React.useEffect(() => {
    fetch("http://localhost:8080/question_count")
      .then((r) => r.json())
      .then((data) => {
        var p = data["question_count"] / size;
        setCount(Math.ceil(p));
        calcList(data["question_count"], page, size);
      });
  }, [page, size]);

  React.useEffect(() => {
    fetch(`http://localhost:8080/question?id=${active}`)
      .then((r) => r.json())
      .then((data) => {
        setQuestionText(data["question"].QuestionText);
        setOptionA(data["question"].Options.A);
        setOptionB(data["question"].Options.B);
        setOptionC(data["question"].Options.C);
        setOptionD(data["question"].Options.D);
        setAnswer(data["question"].Answer);
      });
  }, [active]);

  const calcList = (a, b, c) => {
    var arr = [];
    for (var i = (b - 1) * c + 1; i <= Math.min(a, b * c); i++) {
      arr.push(i);
    }
    setNo(arr);
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Grid container sx={{ height: { xs: "100%", sm: "100dvh" } }}>
        <Grid
          item
          xs={12}
          sm={5}
          lg={4}
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            backgroundColor: "background.paper",
            borderRight: { sm: "none", md: "1px solid" },
            borderColor: { sm: "none", md: "divider" },
            alignItems: "start",
            pt: 4,
            px: 10,
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
            }}
          >
            <Button
              startIcon={<ArrowBackRoundedIcon />}
              component="a"
              href="/"
              sx={{ ml: "-8px" }}
            >
              返回主页
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid
              container
              spacing={{ xs: 1, md: 1 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {no.map((value, index) => (
                <Grid item xs={1} sm={2} md={3} key={index}>
                  <Button
                    color={active === value ? "primary" : "inherit"}
                    variant="outlined"
                    onClick={() => {
                      setActive(value);
                    }}
                  >
                    {value}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
            }}
          >
            <Pagination
              count={count}
              page={page}
              showFirstButton
              showLastButton
              onChange={handlePageChange}
            />
          </Box>
        </Grid>
        <Grid
          item
          sm={12}
          md={7}
          lg={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            width: "100%",
            backgroundColor: { xs: "transparent", sm: "background.default" },
            alignItems: "start",
            pt: { xs: 2, sm: 4 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: { sm: "space-between", md: "flex-end" },
              alignItems: "center",
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
            }}
          >
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Button
                startIcon={<ArrowBackRoundedIcon />}
                component="a"
                href="/"
                sx={{ alignSelf: "start" }}
              >
                返回主页
              </Button>
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexGrow: 1,
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            </Box>
          </Box>
          <Card
            sx={{
              display: { xs: "flex", md: "none" },
              width: "100%",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                ":last-child": { pb: 2 },
              }}
            ></CardContent>
          </Card>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography gutterBottom>{questionText}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
            }}
          >
            <FormControl>
              <RadioGroup aria-labelledby="a-b-c-d" name="radio-buttons-group">
                <FormControlLabel
                  value="A"
                  control={<Radio />}
                  label={optionA}
                />
                <FormControlLabel
                  value="B"
                  control={<Radio />}
                  label={optionB}
                />
                <FormControlLabel
                  value="C"
                  control={<Radio />}
                  label={optionC}
                />
                <FormControlLabel
                  value="D"
                  control={<Radio />}
                  label={optionD}
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
