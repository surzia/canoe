import React from "react";
import { Box, Drawer } from "@mui/material";

type Props = {
  tag: boolean;
  toggleTag: (event: React.KeyboardEvent | React.MouseEvent) => void;
};

function Tag({ tag, toggleTag }: Props) {
  return (
    <Drawer anchor="left" open={tag} onClose={toggleTag}>
      <Box sx={{ width: 360 }} role="presentation"></Box>
    </Drawer>
  );
}

export default Tag;
