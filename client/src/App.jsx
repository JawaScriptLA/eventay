import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';

import Signup from './components/routes/Signup.jsx';
import Home from './components/routes/Home.jsx';
import Login from './components/routes/Login.jsx';
import EventCreator from './components/routes/EventCreator.jsx';
import EventViewer from './components/routes/EventViewer.jsx';
import Profile from './components/routes/Profile.jsx';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/signup' exact component={Signup} />
          <Route path='/login' exact component={Login} />
          <Route path='/profile' exact component={Profile} />
          <Route path='/create' exact component={EventCreator} />
          <Route path='/event' exact component={EventViewer} />
          <Route path='/' exact component={Home}/>
        </Switch>
      </Router>
    );
  }
}