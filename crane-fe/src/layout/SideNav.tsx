import React from "react";
import Box, { BoxProps } from "@mui/joy/Box";

export const SideNav = (props: BoxProps) => (
  <Box
    component="nav"
    className="Navigation"
    {...props}
    sx={[
      {
        p: 2,
        bgcolor: "background.componentBg",
        borderRight: "1px solid",
        borderColor: "divider",
        display: {
          xs: "none",
          sm: "initial",
        },
      },
      ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
    ]}
  />
);
