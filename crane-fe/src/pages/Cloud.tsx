import * as React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Switch,
} from "@mui/material";
import Nav from "../components/Nav";

function Cloud() {
  const handleToggle = (value: string) => () => {
    if (value === "baidu") {
      window.open(
        "http://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id=xCY0e378LB0hvd5R9iOPbT4pRgxhGUnj&redirect_uri=http://localhost:3000/cloud&scope=basic,netdisk",
        "_blank"
      );
    } else if (value === "jianguoyun") {
    }
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
            <ListItemText primary="百度云盘" />
            <Switch edge="end" onChange={handleToggle("baidu")} />
          </ListItem>
          <ListItem>
            <ListItemText primary="坚果云盘" />
            <Switch edge="end" onChange={handleToggle("jianguoyun")} />
          </ListItem>
        </List>
      </Box>
    </React.Fragment>
  );
}

export default Cloud;
