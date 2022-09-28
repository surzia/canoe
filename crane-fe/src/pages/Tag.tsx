import { styled } from "@mui/material/styles";
import { Box, Chip, Drawer } from "@mui/material";

import { TagProps } from "../conf/type";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function Tag({ tag, tagsList, toggleTag }: TagProps) {
  return (
    <Drawer anchor="left" open={tag} onClose={toggleTag}>
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
        {tagsList.map((data, idx) => {
          return (
            <ListItem key={idx}>
              <Chip label={data} />
            </ListItem>
          );
        })}
      </Box>
    </Drawer>
  );
}

export default Tag;
