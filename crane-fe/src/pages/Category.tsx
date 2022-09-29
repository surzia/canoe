import {
  Box,
  Drawer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import SideNav from "../components/SideNav";

import { CategoryProps } from "../conf/type";

function Category({ category, categoriesList, toggleCategory }: CategoryProps) {
  return (
    <Drawer anchor="left" open={category} onClose={toggleCategory}>
      <Box sx={{ width: 360 }} role="presentation">
        <SideNav text="分类" />
        <Box>
          <TableContainer component={Paper}>
            <Table aria-label="category table">
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
      </Box>
    </Drawer>
  );
}

export default Category;
