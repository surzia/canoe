import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Switch,
} from "@mui/material";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

type Props = {
  setting: boolean;
  toggleSetting: (event: React.KeyboardEvent | React.MouseEvent) => void;
};

function Setting({ setting, toggleSetting }: Props) {
  return (
    <Drawer anchor="left" open={setting} onClose={toggleSetting}>
      <Box sx={{ width: 360 }} role="presentation">
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          subheader={<ListSubheader>设置</ListSubheader>}
        >
          <ListItem>
            <ListItemIcon>
              <Brightness4Icon />
            </ListItemIcon>
            <ListItemText id="switch-list-label-wifi" primary="Wi-Fi" />
            <Switch
              edge="end"
              // onChange={handleToggle("wifi")}
              // checked={checked.indexOf("wifi") !== -1}
              inputProps={{
                "aria-labelledby": "switch-list-label-wifi",
              }}
            />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default Setting;
