import {
  Box,
  Drawer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { CategoryProps } from "../conf/type";

function Category({ category, categoriesList, toggleCategory }: CategoryProps) {
  return (
    <Drawer anchor="left" open={category} onClose={toggleCategory}>
      <Box sx={{ width: 360 }} role="presentation">
        <TableContainer component={Paper}>
          <Table aria-label="category table">
            <TableHead>
              <TableRow>
                <TableCell>分类</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoriesList.map((row, idx) => (
                <TableRow
                  key={idx}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Drawer>
  );
}

export default Category;
