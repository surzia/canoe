import * as React from "react";
import { useSearchParams } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { Box, Grid, IconButton, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addStory,
  selectStory,
  updateStory,
  viewStoryById,
  writingStory,
} from "../store/story/reducer";

const StoryLine = styled(TextField)({
  "& label.Mui-focused": {
    color: "gray",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

const StoryBook = React.forwardRef<StoryBookProps, {}>((_props, ref) => {
  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  React.useImperativeHandle(ref, () => ({
    submitStory() {
      let c;
      if (paragraph !== "") {
        c = [...story, paragraph];
      } else {
        c = story;
      }
      dispatch(writingStory(c.join("<br/>")));
      if (sid === null || sid === undefined || sid === "") {
        dispatch(addStory());
      } else {
        dispatch(updateStory(sid));
      }
    },
  }));

  const [blank, setBlank] = React.useState<Boolean>(true);
  const [paragraph, setParagraph] = React.useState<String>("");
  const [story, setStory] = React.useState<String[]>([]);

  const payload = useAppSelector(selectStory);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const sid = searchParams.get("sid");

  React.useEffect(() => {
    if (paragraph !== "") {
      setBlank(false);
    } else {
      setBlank(true);
    }
  }, [paragraph, blank]);

  React.useEffect(() => {
    if (sid === null || sid === undefined || sid === "") {
      return;
    }
    dispatch(viewStoryById(String(sid)));
    let raw = payload.story.content.split("<br/>");
    setStory(raw);
  }, [sid, dispatch, payload]);

  const renderLines = (lines: String[]) => {
    return lines.map((line, idx) => (
      <Grid container spacing={2} key={idx}>
        <Grid item xs={1}></Grid>
        <Grid item xs={11}>
          <StoryLine
            placeholder="记录这一刻"
            fullWidth
            value={line}
            onChange={handleLineChange.bind(this, idx)}
          />
        </Grid>
      </Grid>
    ));
  };

  const handleLineChange = (
    idx: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let c = story;
    c[idx] = event.target.value;
    dispatch(writingStory(c.join("<br/>")));
    setStory(c);
  };

  const handleParagraphChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParagraph(event.target.value);
  };

  const addNewParagraph = (event: React.KeyboardEvent<HTMLImageElement>) => {
    if (event.key === "Enter") {
      let content = [...story, paragraph];
      setStory(content);
      setParagraph("");
      setBlank(true);
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      {renderLines(story)}
      <Grid container spacing={2}>
        <Grid item xs={1} sx={{ position: "relative" }}>
          {blank && (
            <IconButton
              sx={{
                position: "absolute",
                top: "50%",
                bottom: "50%",
                left: "50%",
                right: "50%",
              }}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          )}
        </Grid>
        <Grid item xs={11}>
          <StoryLine
            placeholder="记录这一刻"
            fullWidth
            value={paragraph}
            onChange={handleParagraphChange}
            onKeyUp={addNewParagraph}
          />
        </Grid>
      </Grid>
    </Box>
  );
});

export default StoryBook;
