import * as React from "react";
import { useParams } from "react-router-dom";

import { Box } from "@mui/material";

import Nav from "../components/Nav";
import StoryBoard from "../components/StoryBoard";
import { selectStory, viewStoryById } from "../store/story/reducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";

function View() {
  const { id } = useParams();
  const story = useAppSelector(selectStory);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    let sid = String(id);
    dispatch(viewStoryById(sid));
  }, [id, dispatch]);

  return (
    <React.Fragment>
      <Nav page="view" id={String(id)} refer={null}></Nav>
      <Box sx={{ py: 3 }}>
        <StoryBoard children={story.story.content}></StoryBoard>
      </Box>
    </React.Fragment>
  );
}

export default View;
