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
  deleteParagraph,
  selectStory,
  updateParagraph,
  updateStory,
  uploadImage,
  viewStoryById,
  writingStory,
} from "../store/story/reducer";
import ev from "../ev";
import { BACKEND_API_HOST } from "../common";

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

const FancyEditor = () => {
  const [blank, setBlank] = React.useState<Boolean>(true);
  const [line, setLine] = React.useState<string>("");
  const [show, setShow] = React.useState<Boolean>(false);
  const start = React.useRef<HTMLInputElement>(null);

  const payload = useAppSelector(selectStory);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const sid = searchParams.get("sid");

  const submitStory = () => {
    if (sid === null || sid === undefined || sid === "") {
      dispatch(addStory());
    } else {
      dispatch(updateStory(sid));
    }
  };

  React.useEffect(() => {
    ev.addListener("saveStory", () => {
      submitStory();
    });
    if (sid === null || sid === undefined || sid === "") {
      return;
    }
    dispatch(viewStoryById(sid));
  }, [sid, dispatch]);

  const addNewParagraph = (event: React.KeyboardEvent<HTMLImageElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (line !== "") {
        let content: Paragraph[] = [
          ...payload.story.paragraph,
          {
            pid: "",
            data: line,
            sequence: 1,
            typo: 1,
          },
        ];
        setLine("");
        setBlank(true);
        dispatch(writingStory(content));
      }
    }
  };

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

  const uploadAImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const form = new FormData();
    const files = event.target.files;
    if (files === null || files === undefined) {
      return;
    }
    for (let i = 0; i < files.length; i++) {
      form.append("images", files[i]);
    }
    dispatch(uploadImage(form));
  };

  return (
    <Box sx={{ p: 1 }}>
      {payload.story.paragraph.map((line, idx) => (
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
              onClick={() => {
                dispatch(deleteParagraph({ index: idx, typo: line.typo }));
              }}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
          </Grid>
          <Grid item xs={11}>
            {line.typo === 3 && (
              <Box
                sx={{ height: 300 }}
                style={{
                  backgroundImage: `url(${BACKEND_API_HOST}/images/${line.data}?fit=crop&auto=format)`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></Box>
            )}
            {line.typo === 1 && (
              <StoryLine
                placeholder="记录这一刻"
                fullWidth
                multiline
                value={line.data}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch(
                    updateParagraph({ content: event.target.value, index: idx })
                  );
                }}
                onKeyUp={moveToNextParagraph}
                onKeyDown={moveToNextParagraph}
              />
            )}
          </Grid>
        </Grid>
      ))}
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
              >
                <input
                  hidden
                  accept="image/*"
                  name="images"
                  type="file"
                  // multiple
                  onChange={uploadAImage}
                />
                <ImageOutlinedIcon />
              </IconButton>
            </>
          )}
        </Grid>
        <Grid item xs={11}>
          <StoryLine
            placeholder="📝"
            fullWidth
            multiline
            inputRef={start}
            value={line}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setLine(event.target.value);
            }}
            onKeyDown={addNewParagraph}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FancyEditor;
