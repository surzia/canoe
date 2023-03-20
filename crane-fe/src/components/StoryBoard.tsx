import { Box, Typography } from "@mui/material";
import { BACKEND_API_HOST } from "../common";

function StoryBoard({ paragraph }: ViewProps) {
  const render = (p: Paragraph) => {
    if (p.typo === 1) {
      return (
        <Typography variant="body1" gutterBottom>
          {p.data}
        </Typography>
      );
    } else {
      return (
        <Box
          sx={{ height: 300 }}
          style={{
            backgroundImage: `url(${BACKEND_API_HOST}/images/${p.data}?fit=crop&auto=format)`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></Box>
      );
    }
  };

  return render(paragraph);
}

export default StoryBoard;
