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

import { SettingProps } from "../conf/type";

function Setting({
  setting,
  toggleSetting,
  mode,
  toggleDarkMode,
}: SettingProps) {
  return (
    <Drawer anchor="left" open={setting} onClose={toggleSetting}>
      <Box sx={{ width: 360 }} role="presentation">
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          subheader={<ListSubheader>设置</ListSubheader>}
        >
          <ListItem>
            {mode === "light" && (
              <>
                <ListItemIcon>
                  <Brightness4Icon />
                </ListItemIcon>
                <ListItemText id="switch-dark-light-mode" primary="dark mode" />
              </>
            )}
            {mode === "dark" && (
              <>
                <ListItemIcon>
                  <Brightness7Icon />
                </ListItemIcon>
                <ListItemText id="switch-dark-light-mode" primary="dark mode" />
              </>
            )}
            <Switch
              edge="end"
              onChange={toggleDarkMode}
              // checked={checked.indexOf("wifi") !== -1}
            />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default Setting;
