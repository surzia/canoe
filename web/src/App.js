import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import Paper from "./pages/Paper";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/list" component={List} />
          <Route path="/page" component={Paper} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
