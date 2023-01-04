import * as React from "react";

import Nav from "../components/Nav";
import Result from "../components/Result";

function Search() {
  return (
    <React.Fragment>
      <Nav page="search" id="" refer={null}></Nav>
      <Result />
    </React.Fragment>
  );
}

export default Search;
