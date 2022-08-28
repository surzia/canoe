import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Paper from "./pages/Paper";
import View from "./pages/View";
import Notfound from "./pages/Notfound";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/view/:id" component={View} />
          <Route path="/page" component={Paper} />
          <Route path="/404" component={Notfound} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
