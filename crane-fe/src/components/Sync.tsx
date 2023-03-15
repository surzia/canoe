import * as React from "react";

import {
  Box,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Switch,
  TextField,
} from "@mui/material";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import LoginIcon from "@mui/icons-material/Login";

import { NutstoreIcon } from "../logos/Nutstore";
import ev from "../ev";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { checkStatus, loginToNutstore, syncState } from "../store/sync/reducer";

function Sync() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [show, setShow] = React.useState<boolean>(false);
  const [nutstoreUsername, setNutstoreUsername] = React.useState<string>("");
  const [nutstorePassword, setNutstorePassword] = React.useState<string>("");
  const sync = useAppSelector(syncState);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    ev.addListener("toggleSyncSetting", (status) => setOpen(status));
  }, [open]);

  const handleToggle =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(open);
      setShow(false);
    };

  const handleNutstoreSync = () => {
    dispatch(checkStatus());
    setShow(!sync.sync.login);
  };

  const loginNutstore = () => {
    dispatch(
      loginToNutstore({
        type: "nutstore",
        username: nutstoreUsername,
        password: nutstorePassword,
      })
    );
    handleNutstoreSync();
  };

  return (
    <Drawer anchor="left" open={open} onClose={handleToggle(false)}>
      <Box sx={{ width: 360 }} role="presentation">
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          subheader={
            <ListSubheader>
              <CloudSyncIcon />
            </ListSubheader>
          }
        >
          <ListItem>
            <ListItemIcon>
              <NutstoreIcon />
            </ListItemIcon>
            <ListItemText id="sync-with-nutstore" primary="Nutstore" />
            <Switch
              edge="end"
              checked={sync.sync.login}
              onChange={handleNutstoreSync}
            />
          </ListItem>
          {show && (
            <ListItem>
              <Grid container spacing={2}>
                <Grid item xs={5} md={5}>
                  <TextField
                    label="username"
                    variant="outlined"
                    size="small"
                    value={nutstoreUsername}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNutstoreUsername(e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={5} md={5}>
                  <TextField
                    label="password"
                    type="password"
                    variant="outlined"
                    size="small"
                    value={nutstorePassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNutstorePassword(e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={2} md={2}>
                  <IconButton aria-label="login" onClick={loginNutstore}>
                    <LoginIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  );
}

export default Sync;
