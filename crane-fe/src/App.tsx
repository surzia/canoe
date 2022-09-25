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
import { StoryThumbnail } from "./conf/type";

function App() {
  const [openStoryList, setOpenStoryList] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [count, setCount] = useState<number>(0);
  const [storyList, setStoryList] = useState<StoryThumbnail[]>([]);
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const [openTag, setOpenTag] = useState<boolean>(false);
  const [openSetting, setOpenSetting] = useState<boolean>(false);

  useEffect(() => {
    fetch(`http://localhost:8001/story/query?page=${page}&size=${size}`)
      .then((r) => r.json())
      .then((data) => {
        setStoryList(data.data.stories);
        setCount(data.data.count);
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
        <Story />

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
