import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import idx from "./home.js";
import ex from './ex.js';

class Home extends Component {
    // state = {}
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={idx} />
          <Route path="/im" component={ex} />
        </Switch>
      </Router>
    );
  }
}

export default Home;