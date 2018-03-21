import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Signup from './components/routes/Signup.jsx';
import Home from './components/routes/Home.jsx';
import Login from './components/routes/Login.jsx';
import EventCreator from './components/routes/EventCreator.jsx';
import EventViewer from './components/routes/EventViewer.jsx';
import Profile from './components/routes/Profile.jsx';
import Protected from './components/Protected.jsx';
import Test from './components/routes/Test.jsx';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
        <Route path='/test' exact component={Test}/>
          <Route path='/signup' exact component={Signup} />
          <Route path='/login' exact component={Login} />
          <Route
            path='/profile'
            component={props => <Protected component={Profile} {...props} />}
          />
          <Route
            path='/create'
            component={props => (
              <Protected component={EventCreator} {...props} />
            )}
          />
          <Route
            path='/event'
            component={props => (
              <Protected component={EventViewer} {...props} />
            )}
          />
          <Route
            path='/'
            component={props => <Protected component={Home} {...props} />}
          />
        </Switch>
      </Router>
    );
  }
}
