import * as React from "react";
import { useSearchParams } from "react-router-dom";

import { Box } from "@mui/material";

import Nav from "../components/Nav";
import StoryBoard from "../components/StoryBoard";
import { selectStory, viewStoryById } from "../store/story/reducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";

function View() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("sid");
  const story = useAppSelector(selectStory);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    let sid = String(id);
    dispatch(viewStoryById(sid));
  }, [id, dispatch]);

  return (
    <React.Fragment>
      <Nav page="view" id={String(id)}></Nav>
      <Box sx={{ py: 3 }}>
        {story.story.paragraph.map((para, idx) => (
          <StoryBoard key={idx} paragraph={para} />
        ))}
      </Box>
    </React.Fragment>
  );
}

export default View;
