import * as React from "react";
import { useSearchParams } from "react-router-dom";

import FancyEditor from "../components/FancyEditor";
import Nav from "../components/Nav";

function Story() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("sid");

  return (
    <React.Fragment>
      <Nav page="story" id={String(id)}></Nav>
      <FancyEditor />
    </React.Fragment>
  );
}

export default Story;
