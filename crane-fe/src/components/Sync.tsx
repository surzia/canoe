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

import { NutstoreIcon } from "../logos/Nutstore";

function Sync() {
  return (
    <Drawer anchor="left" open={true}>
      <Box sx={{ width: 360 }} role="presentation">
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          subheader={<ListSubheader>Self hosted server</ListSubheader>}
        >
          <ListItem>
            <ListItemIcon>
              <NutstoreIcon />
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

export default Sync;
