import { Card, CardContent, Typography } from "@mui/material";
import { StoryBoardProps } from "../conf/type";

function StoryBoard({ value, storyCategory, storyTags }: StoryBoardProps) {
  return (
    <Card sx={{ m: 1, p: 1 }}>
      <CardContent>
        <Typography variant="body1">{value}</Typography>
      </CardContent>
    </Card>
  );
}

export default StoryBoard;
