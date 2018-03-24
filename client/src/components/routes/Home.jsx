import React from 'react';
import axios from 'axios';
import FriendsList from '../misc/friendsList.jsx';
import NavBar from './NavBar.jsx';

import Calendar from './Calendar.jsx';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    axios
      .post('/api/auth/logout', {})
      .then(() => {
        localStorage.removeItem('token');
        this.props.history.push('/login');
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    console.log('home render')
    return (
      <div>
        <NavBar />
        <FriendsList history={this.props.history} />
        <button onClick={this.handleLogoutClick}>Logout!</button>
        <Calendar history={this.props.history} />
      </div>
    );
  }
}
