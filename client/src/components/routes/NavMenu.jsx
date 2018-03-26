import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import { Menu, MenuItem } from 'material-ui/Menu';
import axios from 'axios';

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};

export default class NavMenu extends Component {
  constructor (props) {
    super (props);
    this.state = {
      user: {}
    }
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  componentWillMount () {
    this.setState({ user: JSON.parse(localStorage.getItem('userInfo')) });
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

  render () {
    return (
      <div>
          <Menu>
            <MenuItem primaryText="Create Event" onClick={e => this.props.history.push('/create')} />
            <MenuItem primaryText="Profile" onClick={e => this.props.history.push(`/profile/${this.state.user.username}`)} />
            <Divider />
            <MenuItem primaryText="Log Out" onClick={e => this.handleLogoutClick()} />
          </Menu>
      </div>
    );
  }
}
