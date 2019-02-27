import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './components/Home';
// import NoteList from './components/Notes/NoteList';
// import CreateNote from './components/Notes/CreateNote';
// import ViewNote from './components/Notes/ViewNote';
// import EditNote from './components/Notes/EditNote';

// import Login from './components/Auth/SignIn';
// import SignUp from './components/Auth/SignUp';

// import RequireAuth from './hoc/RequireAuth';
// import Convo from './components/Chat/Conversation';


import { isAuthenticated } from './actions';

// const PrivateRoute = ({ component: Comp, ...rest }) => (
//   <Route
//     {...rest}
//     render={compProps =>
//       sessionStorage.getItem('id') ? (
//         <Comp {...compProps} {...rest} />
//       ) : (
//           <Redirect
//             to={{
//               pathname: '/home',
//             }}
//           />
//         )
//     }
//   />
// );

class App extends Component {
  // state = {}
  // async componentWillMount() {
  //   await this.props.isAuthenticated();
  // }
  render() {
    return (
          <Router>
            <div>
              <p>HEYY</p>
              <Link to='/home'>home</Link>
              <Route path="/home" component={Home} />
            </div>
          </Router>

    );
  }
}


const mapStateToProps = state => {
  return {
    isAuth: state.isAuthenticated,
  };
};

export default connect(mapStateToProps, { isAuthenticated })(App);
