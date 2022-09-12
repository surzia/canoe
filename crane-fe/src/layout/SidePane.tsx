import React from "react";
import Box, { BoxProps } from "@mui/joy/Box";

export const SidePane = (props: BoxProps) => (
  <Box
    className="Inbox"
    {...props}
    sx={[
      {
        bgcolor: "background.componentBg",
        borderRight: "1px solid",
        borderColor: "divider",
        display: {
          xs: "none",
          md: "initial",
        },
      },
      ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
    ]}
  />
);
