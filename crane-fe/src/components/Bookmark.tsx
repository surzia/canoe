import { Grid, Link, Paper, Stack, Typography } from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";

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
