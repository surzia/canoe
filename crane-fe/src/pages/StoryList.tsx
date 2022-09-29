import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Drawer,
  Pagination,
  Typography,
} from "@mui/material";
import SideNav from "../components/SideNav";

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
        <SideNav text="story" />
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
