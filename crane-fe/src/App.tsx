import React, { useEffect, useState } from "react";

// MUI dependencies
import { ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";

// Internal dependencies
import theme from "./theme";
import Story from "./pages/Story";
import Toolbox from "./components/Toolbox";
import StoryList from "./pages/StoryList";
import Category from "./pages/Category";
import Tag from "./pages/Tag";
import Setting from "./pages/Setting";
import { State, StoryThumbnail } from "./conf/type";

function App() {
  const [openStoryList, setOpenStoryList] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [count, setCount] = useState<number>(0);
  const [storyList, setStoryList] = useState<StoryThumbnail[]>([]);
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const [openTag, setOpenTag] = useState<boolean>(false);
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const [storyMode, setStoryMode] = useState<State>(State.EditMode);
  const [story, setStory] = useState<string>("");
  const [storyID, setStoryID] = useState<number>(0);

  useEffect(() => {
    fetch(`http://localhost:8001/story/query?page=${page}&size=${size}`)
      .then((r) => r.json())
      .then((data) => {
        setStoryList(data.data.stories);
        setCount(data.data.count);
        setSize(10);
      });
  }, [page, size]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    fetch(`http://localhost:8001/story/query?page=${value}&size=${size}`)
      .then((r) => r.json())
      .then((data) => {
        setStoryList(data.data.stories);
        setPage(value);
      });
  };

  const handleStoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStory(event.target.value);
  };

  const writeStory = () => {
    if (storyID === 0) {
      fetch("http://localhost:8001/story/create", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: story,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          setStoryID(data.data.id);
          setStory(data.data.content);
        });
    } else {
      fetch("http://localhost:8001/story/update", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: storyID,
          content: story,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          setStory(data.data.content);
        });
    }
  };

  const viewStory = (id: number) => {
    fetch(`http://localhost:8001/story/view?id=${id}`)
      .then((r) => r.json())
      .then((data) => {
        setStoryMode(State.ReadMode);
        setStory(data.data.content);
        setStoryID(id);
        setOpenStoryList(false);
      });
  };

  const changeStoryMode = () => {
    if (storyMode === State.ReadMode) {
      setStoryMode(State.EditMode);
    } else {
      writeStory();
      setStoryMode(State.ReadMode);
    }
  };

  const toggleStoryList =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpenStoryList(open);
    };

  const toggleCategory =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpenCategory(open);
    };

  const toggleTag =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpenTag(open);
    };

  const toggleSetting =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpenSetting(open);
    };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Story
          mode={storyMode}
          changeMode={changeStoryMode}
          value={story}
          handleStoryChange={handleStoryChange}
        />

        <Toolbox
          toggleStoryList={toggleStoryList(true)}
          toggleCategory={toggleCategory(true)}
          toggleTag={toggleTag(true)}
          toggleSetting={toggleSetting(true)}
        />

        <StoryList
          open={openStoryList}
          storyList={storyList}
          page={page}
          count={count}
          toggleStoryList={toggleStoryList(false)}
          handlePageChange={handlePageChange}
          viewStory={viewStory}
        />
        <Category
          category={openCategory}
          toggleCategory={toggleCategory(false)}
        />
        <Tag tag={openTag} toggleTag={toggleTag(false)} />
        <Setting setting={openSetting} toggleSetting={toggleSetting(false)} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
