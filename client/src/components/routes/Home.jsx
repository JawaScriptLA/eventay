import React from 'react';
import axios from 'axios';
import FriendsList from '../misc/friendsList.jsx';
import NavBar from './NavBar.jsx';

import Calendar from './Calendar.jsx';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          background: 'linear-gradient(#ffffea, #ffffff)',
        }}
      >
        <NavBar history={this.props.history} />
        <FriendsList history={this.props.history} />
        <Calendar history={this.props.history} />
      </div>
    );
  }
}
