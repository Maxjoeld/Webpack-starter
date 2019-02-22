import React, { Component } from "react";
import { Link } from "react-router-dom";

class App extends Component {
  // state = {  }
  render() { 
    return ( 
      <div className="page">
        Heyy masee
				<div>
				<Link to="/im">Click here</Link>
				</div>
      </div>
    );
  }
}

export default App;