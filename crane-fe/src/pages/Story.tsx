import * as React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Divider,
  IconButton,
  InputBase,
  Modal,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TagIcon from "@mui/icons-material/Tag";
import FolderIcon from "@mui/icons-material/Folder";

import StoryBook from "../components/StoryBook";
import StoryBoard from "../components/StoryBoard";
import { SearchResult, State, StoryProps } from "../conf/type";
import SelectCategory from "../components/SelectCategory";

function Story({
  mode,
  options,
  changeMode,
  value,
  handleStoryChange,
  viewStory,
}: StoryProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [selectCategory, setSelectCategory] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>("");
  const [searchList, setSearchList] = React.useState<SearchResult[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCategoryOpen = () => setSelectCategory(true);
  const handleCategoryClose = () => setSelectCategory(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const searchStory = () => {
    if (search === "") {
      setSearchList([]);
    } else {
      fetch(`http://localhost:8001/story/search?wd=${search}`)
        .then((r) => r.json())
        .then((data) => {
          let result: SearchResult[] = [];
          if (data.data !== null) {
            result = data.data;
          }

          setSearchList(result);
        });
    }
  };

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        {mode === State.ReadMode && (
          <>
            <IconButton onClick={changeMode}>
              <EditIcon />
            </IconButton>
          </>
        )}
        {mode === State.EditMode && (
          <>
            <IconButton onClick={changeMode}>
              <SaveIcon />
            </IconButton>
            <IconButton onClick={handleCategoryOpen}>
              <FolderIcon />
            </IconButton>
            <IconButton>
              <TagIcon />
            </IconButton>
          </>
        )}
        <Typography
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        ></Typography>
        <IconButton onClick={handleOpen}>
          <SearchIcon />
        </IconButton>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "25%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "50%",
              bgcolor: "background.paper",
              border: "1px solid #FAFAFA",
              borderRadius: "10px",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Paper
              component="form"
              sx={{
                display: "flex",
                width: "100%",
                textAlign: "center",
              }}
            >
              <IconButton color="primary" onClick={handleClose}>
                <ExitToAppIcon />
              </IconButton>
              <Divider sx={{ height: 28, m: "auto" }} orientation="vertical" />
              <InputBase
                sx={{ flex: 1, m: 1 }}
                placeholder="搜索全部"
                value={search}
                onChange={handleChange}
              />
              <IconButton onClick={searchStory} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            <Divider sx={{ mt: 1, mb: 1 }} />
            {searchList.map((search, idx) => (
              <Accordion key={idx}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <p dangerouslySetInnerHTML={{ __html: search.hit }}></p>
                </AccordionSummary>
                <AccordionDetails
                  onClick={() => {
                    setOpen(false);
                    viewStory(search.id);
                  }}
                >
                  <p dangerouslySetInnerHTML={{ __html: search.text }}></p>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Modal>
        <SelectCategory
          open={selectCategory}
          options={options}
          close={handleCategoryClose}
        />
      </Toolbar>
      {mode === State.ReadMode ? (
        <StoryBoard value={value} />
      ) : (
        <StoryBook
          placeholder="记录这一刻"
          focused
          fullWidth
          multiline
          value={value}
          onChange={handleStoryChange}
        />
      )}
    </React.Fragment>
  );
}

export default Story;
