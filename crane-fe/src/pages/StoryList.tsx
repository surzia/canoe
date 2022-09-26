import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
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
  viewStory,
}: StoryListProps) {
  return (
    <Drawer anchor="left" open={open} onClose={toggleStoryList}>
      <Box sx={{ width: 360 }} role="presentation">
        <Box sx={{ display: "flex" }}>
          <FormControl size="small" sx={{ m: 1, width: "50%" }}>
            <InputLabel id="story_category">分类</InputLabel>
            <Select
              labelId="story_category"
              id="story-category"
              value={0}
              label="category"
            >
              <MenuItem value={1}>Ten</MenuItem>
              <MenuItem value={2}>Twenty</MenuItem>
              <MenuItem value={3}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ m: 1, width: "50%" }}>
            <InputLabel id="story_tag">标签</InputLabel>
            <Select
              labelId="story_tag"
              id="story-tag"
              value={0}
              // multiple
              label="tag"
            >
              <MenuItem value={1}>Ten</MenuItem>
              <MenuItem value={2}>Twenty</MenuItem>
              <MenuItem value={3}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          {storyList.map((story) => (
            <Card
              variant="outlined"
              sx={{
                transform: "scale(0.95)",
              }}
              key={story.id}
              onClick={() => {
                viewStory(story.id);
              }}
            >
              <CardActionArea>
                <CardContent>
                  <Typography variant="body1">{story.content}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {story.created_at}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
        <Box>
          <Pagination
            variant="outlined"
            count={count}
            page={page}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
            sx={{ m: 1 }}
          />
        </Box>
      </Box>
    </Drawer>
  );
}

export default StoryList;
