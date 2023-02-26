import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Switch,
  TextField,
} from "@mui/material";
import Nav from "../components/Nav";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { cloudState, loginCloud } from "../store/sync/reducer";

function Cloud() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const cloud = useAppSelector(cloudState);
  const dispatch = useAppDispatch();

  const handleJG = () => {
    if (cloud.sync.login) {
      cloud.sync.login = false;
    } else {
      handleOpen();
    }
  };

  const handleConnect = () => {
    dispatch(loginCloud({ user: username, password: password }));
    handleClose();
  };

  return (
    <React.Fragment>
      <Nav page="cloud" id="" refer={null}></Nav>
      <Box sx={{ py: 3 }}>
        <List
          sx={{ width: "60%", bgcolor: "background.paper", mx: "auto" }}
          subheader={<ListSubheader>连接到云端</ListSubheader>}
        >
          <ListItem>
            <ListItemText primary="坚果云盘" />
            <Switch edge="end" checked={cloud.sync.login} onChange={handleJG} />
          </ListItem>
        </List>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>登录到坚果云</DialogTitle>
        <DialogContent>
          <DialogContentText>
            登录到坚果云 -&gt; 账户信息 -&gt; 安全选项 -&gt; 添加应用 -&gt;
            复制邮箱和密码
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="坚果云邮箱"
            type="email"
            fullWidth
            variant="standard"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="坚果云密码"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleConnect}>连接</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default Cloud;
