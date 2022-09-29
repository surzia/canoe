import { styled } from "@mui/material/styles";
import { Box, Chip, Drawer, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { TagProps } from "../conf/type";
import SideNav from "../components/SideNav";
import { useState } from "react";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function Tag({ tag, tagsList, toggleTag }: TagProps) {
  const [flag, setFlag] = useState<boolean>(false);
  const [tagValue, setTagValue] = useState<string>("");

  const handleClick = () => {
    setFlag(!flag);
    if (tagValue === "" || tagValue === null || tagValue === undefined) {
      return;
    }
    fetch("http://localhost:8001/tag/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: tagValue,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        setTagValue("");
        tagsList.push(data.data.tag_name);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagValue(event.target.value);
  };

  return (
    <Drawer anchor="left" open={tag} onClose={toggleTag}>
      <Box
        sx={{
          width: 360,
        }}
        role="presentation"
      >
        <SideNav text="标签" />
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0,
          }}
        >
          {tagsList.map((data, idx) => {
            return (
              <ListItem key={idx}>
                <Chip label={data} />
              </ListItem>
            );
          })}
          {flag && (
            <TextField
              value={tagValue}
              onChange={handleChange}
              size="small"
              sx={{ maxWidth: 60 }}
            />
          )}
          <ListItem>
            <Chip
              clickable
              icon={<AddIcon />}
              label="标签"
              onClick={handleClick}
            />
          </ListItem>
        </Box>
      </Box>
    </Drawer>
  );
}

export default Tag;
