import { styled } from "@mui/material/styles";
import { Box, Chip, Drawer } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

import { CategoryProps } from "../conf/type";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function Category({ category, categoriesList, toggleCategory }: CategoryProps) {
  return (
    <Drawer anchor="left" open={category} onClose={toggleCategory}>
      <Box
        sx={{
          width: 360,
          display: "flex",
          flexWrap: "wrap",
          listStyle: "none",
          p: 0.5,
          m: 0,
        }}
        role="presentation"
      >
        {categoriesList.map((data, idx) => {
          return (
            <ListItem key={idx}>
              <Chip label={data} />
            </ListItem>
          );
        })}
        <IconButton aria-label="add">
          <AddIcon />
        </IconButton>
      </Box>
    </Drawer>
  );
}

export default Category;
