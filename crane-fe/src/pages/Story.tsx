import * as React from "react";

import FancyEditor from "../components/FancyEditor";
import Nav from "../components/Nav";

function Story() {
  return (
    <React.Fragment>
      <Nav page="story" id=""></Nav>
      <FancyEditor />
    </React.Fragment>
  );
}

export default Story;
