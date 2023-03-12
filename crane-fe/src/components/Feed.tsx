import * as React from "react";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Pagination,
  Tooltip,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LaunchIcon from "@mui/icons-material/Launch";
import KeyboardControlKeyIcon from "@mui/icons-material/KeyboardControlKey";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SyncIcon from "@mui/icons-material/Sync";

import { BACKEND_API_HOST, formatDate, goto } from "../common";
import StoryBoard from "./StoryBoard";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { feedResults, feedStory } from "../store/feed/reducer";
import ev from "../ev";
import { syncState, download, upload } from "../store/sync/reducer";

function Feed() {
  const [page, setPage] = React.useState<number>(1);
  const [size] = React.useState<number>(10);
  const [sort, setSort] = React.useState<string>("desc");
  const [opsId, setOpsId] = React.useState<string>("");
  const [word, setWord] = React.useState<string>("");

  const feeds = useAppSelector(feedResults);
  const cloud = useAppSelector(syncState);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    ev.addListener("searchStory", (keyword) => setWord(keyword));
    dispatch(feedStory({ page: page, size: size, sort: sort, word: word }));
  }, [page, size, sort, word, dispatch]);

  const pageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const sortStory = () => {
    let t = sort === "desc" ? "asc" : "desc";
    setSort(t);
  };

  const handleDelete = () => {
    setWord("");
  };

  const uploadToCloud = (id: string) => {
    setOpsId(id);
    dispatch(upload({ sid: id, type: "nutstore" }));
  };

  const downloadFromCloud = (id: string) => {
    setOpsId(id);
    dispatch(download({ sid: id, type: "nutstore" }));
  };

  const syncWithCloud = () => {
    fetch(`${BACKEND_API_HOST}/sync/sync`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <Grid item xs={12} md={8}>
      <Box display="flex">
        <Typography variant="h6" gutterBottom sx={{ flex: 1 }}>
          {word === "" ? (
            "所有"
          ) : (
            <Chip variant="outlined" label={word} onDelete={handleDelete} />
          )}
        </Typography>
        <Typography variant="subtitle2" sx={{ flex: 1 }}>
          共{feeds.feeds.records}条记录
        </Typography>
        <IconButton disabled={!cloud.sync.login} onClick={syncWithCloud}>
          <SyncIcon />
        </IconButton>
        <IconButton onClick={sortStory}>
          {sort === "desc" ? (
            <KeyboardArrowDownIcon />
          ) : (
            <KeyboardControlKeyIcon />
          )}
        </IconButton>
      </Box>
      <Divider />
      {feeds.feeds.feeds.map((story) => (
        <Card key={story.sid} variant="outlined" sx={{ m: 2, display: "flex" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <StoryBoard children={story.content}></StoryBoard>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              <Tooltip title="阅读更多">
                <IconButton
                  aria-label="more"
                  onClick={() => {
                    goto("/view?sid=" + story.sid);
                  }}
                >
                  <LaunchIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={formatDate(story.created_at)}>
                <IconButton>
                  <AccessTimeIcon />
                </IconButton>
              </Tooltip>
              <IconButton
                disabled={!cloud.sync.login}
                onClick={() => {
                  uploadToCloud(story.sid);
                }}
              >
                <CloudUploadIcon />
                {cloud.sync.uploadLoading && opsId === story.sid && (
                  <CircularProgress
                    sx={{
                      color: "green",
                      position: "absolute",
                      top: -6,
                      left: -6,
                      zIndex: 1,
                    }}
                  />
                )}
              </IconButton>
              <IconButton
                disabled={!cloud.sync.login}
                onClick={() => {
                  downloadFromCloud(story.sid);
                }}
              >
                <CloudDownloadIcon />
                {cloud.sync.downloadLoading && opsId === story.sid && (
                  <CircularProgress
                    sx={{
                      color: "green",
                      position: "absolute",
                      // top: -6,
                      // left: -6,
                      zIndex: 1,
                    }}
                  />
                )}
              </IconButton>
            </Box>
          </Box>
          {story.images.length > 0 && (
            <Box sx={{ display: "flex", minWidth: "40%" }}>
              {story.images.map((img) => (
                <CardMedia
                  key={img}
                  sx={{ height: 200, width: "100%" }}
                  component="img"
                  image={`${BACKEND_API_HOST}/images/${img}`}
                  alt="image"
                />
              ))}
            </Box>
          )}
        </Card>
      ))}
      <Divider />
      <Box sx={{ m: 2 }}>
        <Pagination
          count={feeds.feeds.count}
          page={page}
          onChange={pageChange}
        />
      </Box>
    </Grid>
  );
}

export default Feed;
