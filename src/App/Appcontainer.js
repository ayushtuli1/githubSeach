import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Component, Fragment } from "react";

import Home from "../RootComponents/Home/Home.component";
import history from "./app.history";

export default class App extends Component {
  componentDidMount() {
 
  }
  render() {
    return (
      <div>
        <BrowserRouter history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
