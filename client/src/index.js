import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureStore from './store/configureStore.js';
import App from './App.jsx';
const store = configureStore();

render( 
  <Provider store={store}>
    <MuiThemeProvider>
      <App/>  
    </MuiThemeProvider>
  </Provider>, document.getElementById('app'));
