import React from "react";
import { Box, Drawer } from "@mui/material";

type Props = {
  setting: boolean;
  toggleSetting: (event: React.KeyboardEvent | React.MouseEvent) => void;
};

function Setting({ setting, toggleSetting }: Props) {
  return (
    <Drawer anchor="left" open={setting} onClose={toggleSetting}>
      <Box sx={{ width: 360 }} role="presentation"></Box>
    </Drawer>
  );
}

export default Setting;
