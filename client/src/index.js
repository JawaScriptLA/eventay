import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory} from 'react-router';

import App from './App.jsx';

render(
  <Router>
    <Route path='/' component={App}>
    </Route>
  </Router>, 
  document.getElementById('app'));