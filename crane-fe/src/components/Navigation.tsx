import * as React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";

// Icons import
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

export default function Navigation() {
  return (
    <List size="sm" sx={{ "--List-item-radius": "8px" }}>
      <ListItem nested sx={{ p: 0 }}>
        <Box
          sx={{
            mb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            id="nav-list-browse"
            textColor="neutral.500"
            fontWeight={700}
            sx={{
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: ".1rem",
            }}
          >
            分类
          </Typography>
          <IconButton
            size="sm"
            variant="plain"
            color="primary"
            sx={{ "--IconButton-size": "24px" }}
          >
            <AddOutlinedIcon fontSize="small" color="primary" />
          </IconButton>
        </Box>
        <List
          aria-labelledby="nav-list-browse"
          sx={{
            "& .JoyListItemButton-root": { p: "8px" },
          }}
        >
          <ListItem>
            <ListItemButton variant="soft" color="primary">
              <ListItemDecorator sx={{ color: "inherit" }}>
                <FolderOpenOutlinedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>所有</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator sx={{ color: "neutral.500" }}>
                <FavoriteBorderIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>收藏</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
      <ListItem nested>
        <Box
          sx={{
            mt: 2,
            mb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            id="nav-list-tags"
            textColor="neutral.500"
            fontWeight={700}
            sx={{
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: ".1rem",
            }}
          >
            标签
          </Typography>
          <IconButton
            size="sm"
            variant="plain"
            color="primary"
            sx={{ "--IconButton-size": "24px" }}
          >
            <AddOutlinedIcon fontSize="small" color="primary" />
          </IconButton>
        </Box>
        <List
          aria-labelledby="nav-list-tags"
          size="sm"
          sx={{
            "--List-decorator-size": "32px",
            "& .JoyListItemButton-root": { p: "8px" },
          }}
        >
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "99px",
                    bgcolor: "primary.300",
                  }}
                />
              </ListItemDecorator>
              <ListItemContent>日常</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
    </List>
  );
}
