import * as React from "react";
import { useSearchParams } from "react-router-dom";

import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  TextField,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
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
import { BACKEND_API_HOST } from "../common";

interface imageDict {
  Index: number;
  Url: string;
}

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
      let c: String[];
      if (paragraph !== "") {
        c = [...story, paragraph];
      } else {
        c = story;
      }
      images.map((item) => {
        c.splice(item.Index, 0, `![image](${item.Url})`);
      });
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
  const [paragraph, setParagraph] = React.useState<string>("");
  const [story, setStory] = React.useState<string[]>([]);
  const [index, setIndex] = React.useState<number>(0);
  const [images, setImages] = React.useState<imageDict[]>([]);
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

  const renderSingleLine = (line: string, idx: number) => {
    const regex = /!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g;
    const regex_ = /!\[(.*?)]\((http?:\/\/\S+\.\w+)\)/gm;
    const subst = `<img alt='$1' src='$2' />`;
    let m = null;
    if ((m = regex.exec(line)) !== null) {
      return (
        <div
          dangerouslySetInnerHTML={{ __html: line.replace(regex_, subst) }}
        ></div>
      );
    }
    return (
      <StoryLine
        placeholder="记录这一刻"
        fullWidth
        multiline
        value={line}
        onChange={handleLineChange.bind(this, idx)}
        // onKeyUp={moveToNextParagraph}
        onKeyDown={moveToNextParagraph}
      />
    );
  };

  const renderLines = (lines: string[]) => {
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
          {renderSingleLine(line, idx)}
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
        setIndex(index + 1);
        setBlank(true);
      }
    }
  };

  const deleteParagraph = (idx: number) => {
    let c = story;
    c.splice(idx, 1);
    setIndex(index - 1);
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

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const form = new FormData();
    const files = event.target.files;
    if (files === null || files === undefined) {
      return;
    }
    for (let i = 0; i < files.length; i++) {
      form.append("images", files[i]);
    }

    fetch(`${BACKEND_API_HOST}/image/upload`, {
      method: "post",
      body: form,
    })
      .then((r) => r.json())
      .then((data) => {
        images.push({
          Index: index,
          Url: `${BACKEND_API_HOST}/images/${data.data.Filename}`,
        });
        setImages(images);
        setShow(!show);
      });
  };

  const deleteImage = (url: string, idx: number) => {
    fetch(`${BACKEND_API_HOST}/image/delete`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url,
      }),
    })
      .then((r) => r.json())
      .then(() => {
        let c = images;
        c.splice(idx, 1);
        setImages(c);
      });
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
                <input
                  hidden
                  accept="image/*"
                  name="images"
                  type="file"
                  // multiple
                  onChange={uploadImage}
                />
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
      <ImageList sx={{ p: 1 }} variant="quilted" cols={4} rowHeight={200}>
        {images.map((item, idx) => (
          <ImageListItem key={idx}>
            <img src={`${item.Url}`} alt="image" loading="lazy" />
            <ImageListItemBar
              sx={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                  "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
              }}
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: "white" }}
                  onClick={() => deleteImage(item.Url, idx)}
                >
                  <DeleteIcon />
                </IconButton>
              }
              actionPosition="left"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
});

export default StoryBook;
