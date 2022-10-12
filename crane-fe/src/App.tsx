import React, { useEffect, useState } from "react";

// MUI dependencies
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";

// Internal dependencies
import Story from "./pages/Story";
import Toolbox from "./components/Toolbox";
import StoryList from "./pages/StoryList";
import Category from "./pages/Category";
import Tag from "./pages/Tag";
import Setting from "./pages/Setting";
import { CategoryItem, State, StoryThumbnail } from "./conf/type";

function App() {
  const [openStoryList, setOpenStoryList] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [count, setCount] = useState<number>(0);
  const [storyList, setStoryList] = useState<StoryThumbnail[]>([]);
  const [categoriesList, setCategoriesList] = useState<CategoryItem[]>([]);
  const [categoryOptions, setCategoryOptions] = React.useState<string[]>([]);
  const [tagOptions, setTagOptions] = React.useState<string[]>([]);
  const [tagsList, setTagsList] = useState<string[]>([]);
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const [openTag, setOpenTag] = useState<boolean>(false);
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const [storyMode, setStoryMode] = useState<State>(State.EditMode);
  const [story, setStory] = useState<string>("");
  const [storyID, setStoryID] = useState<number>(0);
  const [storyCategoryID, setStoryCategoryID] = useState<number>(0);
  const [storyTagsID, setStoryTagsID] = useState<number[]>([]);
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  useEffect(() => {
    fetch(`http://localhost:8001/story/query?page=${page}&size=${size}`)
      .then((r) => r.json())
      .then((data) => {
        setStoryList(data.data.stories);
        setCount(data.data.count);
        setSize(10);
      });
  }, [page, size]);

  useEffect(() => {
    fetch("http://localhost:8001/category/query")
      .then((r) => r.json())
      .then((data) => {
        let array = [];
        if (data.data !== null) {
          array = data.data;
        }
        let list: CategoryItem[] = [];
        let arr: string[] = [];
        arr.push("默认分类");
        for (let i = 0; i < array.length; i++) {
          const element = array[i];
          list.push({
            key: element.key,
            name: element.name,
            created: element.created,
          });
          arr.push(element.name);
        }
        setCategoriesList(list);
        setCategoryOptions(arr);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8001/tag/query")
      .then((r) => r.json())
      .then((data) => {
        let array = data.data;
        let list: string[] = [];
        for (let i = 0; i < array.length; i++) {
          const element = array[i];
          list.push(element.tag_name);
        }
        setTagsList(list);
        setTagOptions(list);
      });
  }, []);

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

  const handleSelectedCategoryChange = (event: any, value: string | null) => {
    fetch(`http://localhost:8001/category/getid?c=${value}`)
      .then((r) => r.json())
      .then((data) => {
        setStoryCategoryID(data.data);
      });
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
          category_id: storyCategoryID,
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
      if (story === "" || story === null || story === undefined) {
        //TODO alert
        return;
      }
      writeStory();
      setStoryMode(State.ReadMode);
    }
  };

  const toggleDarkMode = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
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
      <CssBaseline />
      <Container maxWidth="lg" sx={{ bgcolor: "background.default" }}>
        <Story
          mode={storyMode}
          categoryOptions={categoryOptions}
          tagOptions={tagOptions}
          changeMode={changeStoryMode}
          value={story}
          handleStoryChange={handleStoryChange}
          viewStory={viewStory}
          storyCategory={storyCategoryID}
          handleSelectedCategoryChange={handleSelectedCategoryChange}
          storyTags={storyTagsID}
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
          categoriesList={categoriesList}
          setCategoriesList={setCategoriesList}
          toggleCategory={toggleCategory(false)}
        />
        <Tag tag={openTag} tagsList={tagsList} toggleTag={toggleTag(false)} />
        <Setting
          setting={openSetting}
          toggleSetting={toggleSetting(false)}
          mode={mode}
          toggleDarkMode={toggleDarkMode}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
