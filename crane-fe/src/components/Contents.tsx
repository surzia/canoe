import * as React from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import AspectRatio from "@mui/joy/AspectRatio";
import ListDivider from "@mui/joy/ListDivider";
import Textarea from "@mui/joy/Textarea";

// Icons import
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import CropFreeOutlinedIcon from "@mui/icons-material/CropFreeOutlined";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FolderIcon from "@mui/icons-material/Folder";

export default function StoryContent() {
  const [content, setContent] = React.useState(
    "There are plenty of amazing things to see there, from internationally recognized granite cliffs, waterfalls, clear streams, giant sequoia groves, lakes, mountains, meadows, glaciers, and a lot o biological diversity. It is amazing that almost 95 percent of the park is designated wilderness. Yosemite is one of the largest and least fragmented habitat blocks in the Serra Nevada, and the park supports a fantastic diversity of plants and animals."
  );

  return (
    <Sheet
      variant="outlined"
      sx={{
        minHeight: 500,
        borderRadius: "sm",
        p: 2,
        mb: 3,
        bgcolor: "background.componentBg",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "32px",
            flexDirection: "row",
            gap: 1.5,
          }}
        >
          <IconButton size="sm" variant="outlined" color="neutral">
            <BorderColorOutlinedIcon />
          </IconButton>
          <IconButton size="sm" variant="outlined" color="neutral">
            <CropFreeOutlinedIcon />
          </IconButton>
          <IconButton size="sm" variant="outlined" color="neutral">
            <DeleteRoundedIcon />
          </IconButton>
        </Box>
      </Box>
      <ListDivider component="hr" sx={{ mt: 2 }} />
      <Typography level="body2" textColor="text.secondary" mt={2} mb={2}>
        {content}
      </Typography>
      <Textarea minRows={2} size="lg" defaultValue={content} />
      <ListDivider component="hr" />
      <Typography
        level="body2"
        fontWeight="md"
        textColor="text.primary"
        mt={2}
        mb={2}
      >
        附件
      </Typography>
      <Box
        sx={(theme) => ({
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          "& > div": {
            boxShadow: "none",
            "--Card-padding": "0px",
            "--Card-radius": theme.vars.radius.sm,
          },
        })}
      >
        <Card variant="outlined">
          <AspectRatio ratio="1" sx={{ minWidth: 80 }}>
            <img
              src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=2370"
              alt="Yosemite National Park"
            />
          </AspectRatio>
        </Card>
        <Card variant="outlined">
          <AspectRatio ratio="1" sx={{ minWidth: 80 }}>
            <img
              src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=2370"
              alt="Yosemite National Park"
            />
          </AspectRatio>
        </Card>
        <Card variant="outlined" row>
          <CardOverflow>
            <AspectRatio ratio="1" sx={{ minWidth: 80 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FolderIcon />
              </Box>
            </AspectRatio>
          </CardOverflow>
          <Box sx={{ p: { xs: 1, sm: 2 } }}>
            <Typography level="body2" color="primary">
              videos-hike.zip
            </Typography>
            <Typography level="body3">100 MB</Typography>
          </Box>
        </Card>
      </Box>
    </Sheet>
  );
}
