import * as React from "react";

import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Container,
  Divider,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LaunchIcon from "@mui/icons-material/Launch";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

import { useAppDispatch } from "../store/hooks";
import { searchStory } from "../store/search/reducer";
import StoryBoard from "./StoryBoard";
import { goto } from "../common";

const Result = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [res, setRes] = React.useState<ISearch[]>([]);
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const expendResult =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const doSearch = async () => {
    const ret = await dispatch(searchStory(value));
    setRes(ret.payload.data);
    setLoading(true);
  };

  const renderResult = () => {
    if (res === null || res === undefined) {
      return <></>;
    }
    return (
      <>
        {res.map((card) => (
          <Accordion
            expanded={expanded === card.sid}
            onChange={expendResult(card.sid)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <StoryBoard children={card.hit} />
            </AccordionSummary>
            <AccordionDetails>
              <StoryBoard children={card.text} />
            </AccordionDetails>
            <AccordionActions>
              <IconButton onClick={() => goto(`/view?sid=${card.sid}`)}>
                <LaunchIcon />
              </IconButton>
            </AccordionActions>
          </Accordion>
        ))}
      </>
    );
  };

  return (
    <Container>
      <Paper
        component="form"
        sx={{
          mx: "auto",
          my: "1%",
          display: "flex",
          alignItems: "center",
          width: "80%",
        }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="在这里搜索"
          inputProps={{ "aria-label": "search all story" }}
          value={value}
          onChange={handleChange}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={() => {
            doSearch();
          }}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      {loading && renderResult()}
    </Container>
  );
};

export default Result;
