import * as React from "react";

import Nav from "../components/Nav";
import StoryBook from "../components/StoryBook";

function Story() {
  const StoryBookRef = React.useRef<StoryBookProps>(null);

  return (
    <React.Fragment>
      <Nav page="story" id="" refer={StoryBookRef}></Nav>
      <StoryBook ref={StoryBookRef} />
    </React.Fragment>
  );
}

export default Story;
