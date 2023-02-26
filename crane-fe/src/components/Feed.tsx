import * as React from "react";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
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
import InfoIcon from "@mui/icons-material/Info";
import KeyboardControlKeyIcon from "@mui/icons-material/KeyboardControlKey";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SyncIcon from "@mui/icons-material/Sync";

import { BACKEND_API_HOST, goto } from "../common";
import StoryBoard from "./StoryBoard";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { feedResults, feedStory } from "../store/feed/reducer";
import ev from "../ev";
import { cloudState, download, upload } from "../store/sync/reducer";

function Feed() {
  const [page, setPage] = React.useState<number>(1);
  const [size] = React.useState<number>(10);
  const [sort, setSort] = React.useState<string>("desc");
  const [word, setWord] = React.useState<string>("");

  const feeds = useAppSelector(feedResults);
  const cloud = useAppSelector(cloudState);
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
    dispatch(upload(id));
  };

  const downloadFromCloud = (id: string) => {
    dispatch(download(id));
  };

  const syncWithCloud = () => {
    fetch(`${BACKEND_API_HOST}/sync/jianguo/sync`, {
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
        <Card key={story.sid} variant="outlined" sx={{ m: 2 }}>
          <CardContent>
            <StoryBoard children={story.content}></StoryBoard>
          </CardContent>
          <CardActions>
            <Tooltip title="阅读更多">
              <IconButton
                aria-label="more"
                onClick={() => {
                  goto("/view?sid=" + story.sid);
                }}
              >
                <InfoIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={story.created_at}>
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
            </IconButton>
            <IconButton
              disabled={!cloud.sync.login}
              onClick={() => {
                downloadFromCloud(story.sid);
              }}
            >
              <CloudDownloadIcon />
            </IconButton>
          </CardActions>
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
