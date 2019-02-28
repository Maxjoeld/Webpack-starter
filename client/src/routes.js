import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './components/Home/Home';
import NoteList from './components/Notes/NoteList';
import CreateNote from './components/Notes/CreateNote';
import ViewNote from './components/Notes/ViewNote';
import EditNote from './components/Notes/EditNote';

import Login from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';

// import RequireAuth from './hoc/RequireAuth';
import Convo from './components/Chat/Conversation';


import { isAuthenticated } from './actions';

const PrivateRoute = ({ component: Comp, ...rest }) => (
  <Route
    {...rest}
    render={compProps =>
      sessionStorage.getItem('id') ? (
        <Comp {...compProps} {...rest} />
      ) : (
          <Redirect
            to={{
              pathname: '/home',
            }}
          />
        )
    }
  />
);

class App extends Component {
  // state = {}
  // async componentWillMount() {
  //   await this.props.isAuthenticated();
  // }
  render() {
    return (
      <Router>
        {/* <Switch> */}
        <div>
          <Route path="/home" component={Home} />
          <div className="App"> 
            <Route path="/login" component={Login} />
            <Route path="/signup" component={(SignUp)} />
            <PrivateRoute exact path="/" component={(NoteList)} />
            <PrivateRoute path="/create" component={(CreateNote)} />
            <PrivateRoute path="/view" component={(ViewNote)} />
            <PrivateRoute path="/edit" component={(EditNote)} />
            <PrivateRoute path="/convo" component={(Convo)} />  
          </div> 
        </div>
        {/* </Switch> */}
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
