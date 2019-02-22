import React, { Component } from "react";
import { Link } from "react-router-dom";
// import bg from './screen1.png';

class App extends Component {
  // state = {  }
  render() { 
    return ( 
      <div className="page">
        Heyy mafee
				<div>
					{/* <img src={bg} alt="hey" /> */}
				<Link to="/im">Click here</Link>
				</div>
      </div>
    );
  }
}

export default App;