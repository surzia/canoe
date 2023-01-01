import * as React from "react";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";

import { BACKEND_API_HOST, goto } from "../common";
import StoryBoard from "./StoryBoard";

function Feed() {
  const [page, setPage] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>(10);
  const [count, setCount] = React.useState<number>(0);
  const [stories, setStories] = React.useState<Story[]>([]);

  React.useEffect(() => {
    fetch(`${BACKEND_API_HOST}/story/query?page=${page}&size=${size}`)
      .then((r) => r.json())
      .then((data) => {
        setStories(data.data.stories);
        setCount(data.data.count);
        setSize(10);
      });
  }, [page, size]);

  const pageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        Your stories
      </Typography>
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
