import React, { Component } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function createData(time, amount) {
  return { time, amount };
}

function createTData(title, created, updated) {
  return { title, created, updated };
}

const theme = createTheme({});
const rows = [
  createTData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createTData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createTData("Eclair", 262, 16.0, 24, 6.0),
  createTData("Cupcake", 305, 3.7, 67, 4.3),
  createTData("Gingerbread", 356, 16.0, 49, 3.9),
];
const data = [
  createData("00:00", 0),
  createData("03:00", 300),
  createData("06:00", 600),
  createData("09:00", 800),
  createData("12:00", 1500),
  createData("15:00", 2000),
  createData("18:00", 2400),
  createData("21:00", 2400),
  createData("24:00", undefined),
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postList: [],
      total: 0,
      page: 1,
      size: 10,
    };

    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }

  componentDidMount() {
    fetch(
      `http://localhost:8000/api/list?page=${this.state.page}&size=${this.state.size}`
    )
      .then((r) => r.json())
      .then((data) => {
        this.setState({
          total: data.count,
          postList: data.results,
        });
      });
  }

  handleChangePage(e, p) {
    this.setState(
      {
        page: p + 1,
      },
      () => {
        fetch(
          `http://localhost:8000/api/list?page=${this.state.page}&size=${this.state.size}`
        )
          .then((r) => r.json())
          .then((data) => {
            this.setState({
              total: data.count,
              postList: data.results,
            });
          });
      }
    );
  }

  handleChangeRowsPerPage(e) {
    this.setState(
      {
        size: e.target.value,
      },
      () => {
        fetch(
          `http://localhost:8000/api/list?page=${this.state.page}&size=${this.state.size}`
        )
          .then((r) => r.json())
          .then((data) => {
            this.setState({
              total: data.count,
              postList: data.results,
            });
          });
      }
    );
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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240
                }}
              >
                <ResponsiveContainer>
                  <LineChart
                    data={data}
                    margin={{
                      top: 16,
                      right: 16,
                      bottom: 0,
                      left: 24
                    }}
                  >
                    <XAxis
                      dataKey="time"
                      stroke={theme.palette.text.secondary}
                      style={theme.typography.body2}
                    />
                    <YAxis
                      stroke={theme.palette.text.secondary}
                      style={theme.typography.body2}
                    >
                      <Label
                        angle={270}
                        position="left"
                        style={{
                          textAnchor: "middle",
                          fill: theme.palette.text.primary,
                          ...theme.typography.body1
                        }}
                      >
                        Sales ($)
                      </Label>
                    </YAxis>
                    <Line
                      isAnimationActive={false}
                      type="monotone"
                      dataKey="amount"
                      stroke={theme.palette.primary.main}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240
                }}
              >
                <Typography component="p" variant="h4">
                  $3,024.00
                </Typography>
                <Typography color="text.secondary" sx={{ flex: 1 }}>
                  on 15 March, 2019
                </Typography>
                <div>
                  <Link color="primary" href="#">
                    View balance
                  </Link>
                </div>
              </Paper>
            </Grid> */}
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>标题</TableCell>
                      <TableCell align="right">创建时间</TableCell>
                      <TableCell align="right">最后更新时间</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.postList.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.title}
                        </TableCell>
                        <TableCell align="right">{row.created}</TableCell>
                        <TableCell align="right">{row.updated}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                rowsPerPageOptions={[5, 10, 15]}
                count={this.state.total}
                page={this.state.page - 1}
                onPageChange={this.handleChangePage}
                rowsPerPage={this.state.size}
                onRowsPerPageChange={this.handleChangeRowsPerPage}
              />
            </Grid>
          </Grid>
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
        </Container>
      </ThemeProvider>
    );
  }
}

export default App;
