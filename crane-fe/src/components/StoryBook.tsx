import * as React from "react";
import { useSearchParams } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { Box, Grid, IconButton, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

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
  const [show, setShow] = React.useState<Boolean>(false);
  const [paragraph, setParagraph] = React.useState<String>("");
  const [story, setStory] = React.useState<String[]>([]);
  const [sections, setSections] = React.useState<JSX.Element[]>([]);
  const start = React.useRef<HTMLInputElement>(null);

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
    async function loadStory(i: string) {
      const res = await dispatch(viewStoryById(i));
      let raw = res.payload.data.content.split("<br/>");
      setStory(raw);
    }
    loadStory(String(sid));
  }, [sid, dispatch]);

  const renderLines = (lines: String[]) => {
    return lines.map((line, idx) => (
      <Grid container spacing={2} key={idx}>
        <Grid
          item
          xs={1}
          sx={{
            position: "relative",
            opacity: "0",
            "&:hover": {
              opacity: "1",
            },
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              bottom: "50%",
              left: "50%",
              right: "50%",
            }}
            onClick={() => deleteParagraph(idx)}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
        </Grid>
        <Grid item xs={11}>
          <StoryLine
            placeholder="记录这一刻"
            fullWidth
            multiline
            value={line}
            onChange={handleLineChange.bind(this, idx)}
            // onKeyUp={moveToNextParagraph}
            onKeyDown={moveToNextParagraph}
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
      event.preventDefault();
      if (paragraph !== "") {
        let content = [...story, paragraph];
        setStory(content);
        setParagraph("");
        setBlank(true);
      }
    }
  };

  const deleteParagraph = (idx: number) => {
    let c = story;
    c.splice(idx, 1);
    setStory(c);
  };

  React.useEffect(() => {
    setSections(renderLines(story));
  });

  const moveToNextParagraph = (
    event: React.KeyboardEvent<HTMLImageElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.key = "Shift";
    }
    if (event.key === "Shift") {
      if (start.current) {
        start.current.focus();
      }
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      {sections}
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
              onClick={() => {
                setShow(!show);
              }}
            >
              {show ? <HighlightOffOutlinedIcon /> : <AddCircleOutlineIcon />}
            </IconButton>
          )}
          {show && (
            <>
              <IconButton
                component="label"
                sx={{
                  position: "absolute",
                  top: "100%",
                  bottom: "0%",
                  left: "50%",
                  right: "50%",
                }}
                // onClick={addImage}
              >
                <input hidden accept="image/*" type="file" />
                <ImageOutlinedIcon />
              </IconButton>
              {/* <IconButton
                sx={{
                  position: "absolute",
                  top: "150%",
                  bottom: "-50%",
                  left: "50%",
                  right: "50%",
                }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
              <IconButton
                sx={{
                  position: "absolute",
                  top: "200%",
                  bottom: "-100%",
                  left: "50%",
                  right: "50%",
                }}
              >
                <AddCircleOutlineIcon />
              </IconButton> */}
            </>
          )}
        </Grid>
        <Grid item xs={11}>
          <StoryLine
            placeholder="记录这一刻"
            fullWidth
            multiline
            inputRef={start}
            value={paragraph}
            onChange={handleParagraphChange}
            onKeyUp={moveToNextParagraph}
            onKeyDown={addNewParagraph}
          />
        </Grid>
      </Grid>
    </Box>
  );
});

export default StoryBook;
