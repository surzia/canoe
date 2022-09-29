import { Box, IconButton, Typography } from "@mui/material";
import FullscreenCartIcon from "@mui/icons-material/Fullscreen";
import { SideNavProps } from "../conf/type";

function SideNav({ text }: SideNavProps) {
  return (
    <Box sx={{ display: "flex" }}>
      <Typography
        variant="subtitle1"
        sx={{ flexGrow: 1, textAlign: "center", p: 0.1, m: "auto" }}
      >
        {text}
      </Typography>
      <IconButton color="primary" aria-label="full screen">
        <FullscreenCartIcon />
      </IconButton>
    </Box>
  );
}

export default SideNav;
