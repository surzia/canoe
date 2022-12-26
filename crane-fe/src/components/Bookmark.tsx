import { Grid, Link, Paper, Stack, Typography } from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

const sidebar = {
  title: "About",
  description:
    "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
  archives: [
    { title: "March 2020", url: "#" },
    { title: "February 2020", url: "#" },
    { title: "January 2020", url: "#" },
    { title: "November 1999", url: "#" },
    { title: "October 1999", url: "#" },
    { title: "September 1999", url: "#" },
    { title: "August 1999", url: "#" },
    { title: "July 1999", url: "#" },
    { title: "June 1999", url: "#" },
    { title: "May 1999", url: "#" },
    { title: "April 1999", url: "#" },
  ],
  social: [
    { name: "GitHub", icon: GitHubIcon },
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon },
  ],
};

function Bookmark() {
  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.200" }}>
        <Typography variant="h6" gutterBottom>
          千纸鹤写作
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Papercrane writer
        </Typography>
        <Typography variant="body2">
          随时随地随意记录故事
          <br />
          Write your story in papercrane. Anywhere. Anytime. Anyway.
        </Typography>
      </Paper>
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        我的收藏
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        周边
      </Typography>
      <Link
        display="block"
        variant="body1"
        href="https://github.com/surzia/papercrane"
        key="GitHub"
        sx={{ mb: 0.5 }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <GitHubIcon />
          <span>GitHub</span>
        </Stack>
      </Link>
    </Grid>
  );
}

export default Bookmark;
