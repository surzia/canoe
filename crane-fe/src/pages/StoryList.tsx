import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Drawer,
  Pagination,
  Typography,
} from "@mui/material";

import { StoryListProps } from "../conf/type";

function StoryList({
  open,
  storyList,
  page,
  count,
  toggleStoryList,
  handlePageChange,
}: StoryListProps) {
  return (
    <Drawer anchor="left" open={open} onClose={toggleStoryList}>
      <Box sx={{ width: 360 }} role="presentation">
        <Box>
          {storyList.map((story) => (
            <Card key={story.id}>
              <CardActionArea>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {story.content}
                  </Typography>
                  <Typography variant="body2">{story.createdAt}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
        <Box>
          <Pagination
            count={count}
            page={page}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </Box>
      </Box>
    </Drawer>
  );
}

export default StoryList;
