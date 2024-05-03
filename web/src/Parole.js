import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Parole() {
  const [open, setOpen] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [words, setWords] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [size] = React.useState(25);

  React.useEffect(() => {
    fetch("http://localhost:8080/words_count")
      .then((r) => r.json())
      .then((data) => {
        setCount(data["words_count"]);
      });
  }, [page, size]);

  React.useEffect(() => {
    fetch(`http://localhost:8080/words`)
      .then((r) => r.json())
      .then((data) => {
        setWords(data["words"]);
        console.log(data["words"]);
      });
  }, [page, size]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        行测言语
      </Typography>
      <Button
        startIcon={<ArrowBackRoundedIcon />}
        component="a"
        href="/"
        sx={{ ml: "-8px" }}
      >
        返回主页
      </Button>
      <Button
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
        sx={{ ml: "-8px" }}
      >
        添加词语
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            fetch("http://localhost:8080/add", {
              method: "POST",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                word: event.target.word.value,
                meaning: event.target.meaning.value,
              }),
            });
            handleClose();
            window.location.reload();
          },
        }}
      >
        <DialogTitle>添加词语</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            id="word"
            name="word"
            label="词语"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            id="meaning"
            name="meaning"
            label="解释"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button type="submit">添加</Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>词语</TableCell>
              <TableCell align="right">解释</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {words.map((row) => (
              <TableRow
                key={row.word}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.word}
                </TableCell>
                <TableCell align="right">{row.meaning}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TablePagination
            count={count}
            page={page - 1}
            rowsPerPage={size}
            onPageChange={handleChangePage}
          />
        </Table>
      </TableContainer>
    </>
  );
}
