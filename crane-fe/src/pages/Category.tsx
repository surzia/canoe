import React from "react";
import { Box, Drawer } from "@mui/material";

type Props = {
  category: boolean;
  toggleCategory: (event: React.KeyboardEvent | React.MouseEvent) => void;
};

function Category({ category, toggleCategory }: Props) {
  return (
    <Drawer anchor="left" open={category} onClose={toggleCategory}>
      <Box sx={{ width: 360 }} role="presentation"></Box>
    </Drawer>
  );
}

export default Category;
