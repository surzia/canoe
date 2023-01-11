import * as React from "react";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Pagination,
  Typography,
} from "@mui/material";
import KeyboardControlKeyIcon from "@mui/icons-material/KeyboardControlKey";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { BACKEND_API_HOST, goto } from "../common";
import StoryBoard from "./StoryBoard";

function Feed() {
  const [page, setPage] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>(10);
  const [count, setCount] = React.useState<number>(0);
  const [sort, setSort] = React.useState<string>("desc");
  const [stories, setStories] = React.useState<Story[]>([]);

  React.useEffect(() => {
    fetchStoryFeed();
  }, [page, size]);

  const fetchStoryFeed = () => {
    fetch(
      `${BACKEND_API_HOST}/story/query?page=${page}&size=${size}&sort=${sort}`
    )
      .then((r) => r.json())
      .then((data) => {
        setStories(data.data.stories);
        setCount(data.data.count);
        setSize(10);
      });
  };

  const pageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const sortStory = () => {
    let t = sort === "desc" ? "asc" : "desc";
    setSort(t);
    fetchStoryFeed();
  };

  return (
    <Grid item xs={12} md={8}>
      <Box display="flex">
        <Typography variant="h6" gutterBottom sx={{ flex: 1 }}>
          Your stories
        </Typography>
        <IconButton onClick={sortStory}>
          {sort === "desc" ? (
            <KeyboardArrowDownIcon />
          ) : (
            <KeyboardControlKeyIcon />
          )}
        </IconButton>
      </Box>
      <Divider />
      {stories.map((story) => (
        <Card key={story.sid} variant="outlined" sx={{ m: 2 }}>
          <CardContent>
            <StoryBoard children={story.content}></StoryBoard>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => {
                goto("/view?sid=" + story.sid);
              }}
            >
              阅读全文
            </Button>
          </CardActions>
        </Card>
      ))}
      <Divider />
      <Box sx={{ m: 2 }}>
        <Pagination count={count} page={page} onChange={pageChange} />
      </Box>
    </Grid>
  );
}

export default Feed;
