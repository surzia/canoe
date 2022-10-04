import { useState } from "react";

import {
  Box,
  Drawer,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";

import SideNav from "../components/SideNav";

import {
  CategoryItem,
  CategoryProps,
  CategoryToolbarState,
  OrderProps,
} from "../conf/type";
import { CategoryHeadCell } from "../conf/values";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: OrderProps,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function Category({
  category,
  categoriesList,
  setCategoriesList,
  toggleCategory,
}: CategoryProps) {
  const [order, setOrder] = useState<OrderProps>("desc");
  const [orderBy, setOrderBy] = useState<keyof CategoryItem>("created");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [status, setStatus] = useState<CategoryToolbarState>(
    CategoryToolbarState.RawText
  );
  const [categoryName, setCategoryName] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const handleStatusAdd = () => {
    setStatus(CategoryToolbarState.Created);
  };

  const handleStatusSave = () => {
    if (
      categoryName === "" ||
      categoryName === null ||
      categoryName === undefined
    ) {
      setStatus(CategoryToolbarState.RawText);
      return;
    }
    fetch("http://localhost:8001/category/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: categoryName,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        setCategoryName("");
        setCategoriesList([
          ...categoriesList,
          {
            key: data.data.key,
            name: data.data.name,
            created: data.data.created,
          },
        ]);
      });
    setStatus(CategoryToolbarState.RawText);
  };

  const createSortHandler =
    (property: keyof CategoryItem) => (event: React.MouseEvent<unknown>) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  return (
    <Drawer anchor="left" open={category} onClose={toggleCategory}>
      <Box sx={{ width: 360 }} role="presentation">
        <SideNav text="分类" />
        <Box>
          <Toolbar>
            {status === CategoryToolbarState.RawText && (
              <>
                <Typography
                  sx={{ flex: "1 1 100%" }}
                  variant="subtitle2"
                  id="tableTitle"
                  component="div"
                >
                  共{categoriesList.length}条记录
                </Typography>
                <Tooltip title="添加分类">
                  <IconButton onClick={handleStatusAdd}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
            {status === CategoryToolbarState.Created && (
              <>
                <TextField
                  sx={{ flex: "1 1 100%", p: 1 }}
                  size="small"
                  id="create-category"
                  variant="outlined"
                  value={categoryName}
                  onChange={handleChange}
                />
                <Tooltip title="保存分类">
                  <IconButton onClick={handleStatusSave}>
                    <SaveIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
            {status === CategoryToolbarState.Selected && (
              <Typography
                sx={{ flex: "1 1 100%" }}
                variant="subtitle2"
                id="tableTitle"
                component="div"
              >
                共{categoriesList.length}条记录
              </Typography>
            )}
          </Toolbar>
          <TableContainer component={Paper}>
            <Table aria-label="category table">
              <TableHead>
                <TableRow>
                  {CategoryHeadCell.map((c) => (
                    <TableCell
                      key={c.id}
                      sortDirection={orderBy === c.id ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === c.id}
                        direction={orderBy === c.id ? order : "asc"}
                        onClick={createSortHandler(c.id)}
                      >
                        {c.label}
                        {orderBy === c.id ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort(categoriesList, getComparator(order, orderBy)).map(
                  (row, idx) => {
                    const isItemSelected = isSelected(row.name);

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={idx}
                        selected={isItemSelected}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell>{row.created}</TableCell>
                      </TableRow>
                    );
                  }
                )}
                {/* {categoriesList.map((row, idx) => (
                  <TableRow
                    key={idx}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.created}</TableCell>
                  </TableRow>
                ))} */}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Drawer>
  );
}

export default Category;
