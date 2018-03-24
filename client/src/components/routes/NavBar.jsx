import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import SearchBar from 'material-ui-search-bar'
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import axios from 'axios';

const config = {
  headers: { 'Authorization': 'bearer ' + localStorage.token}
};

export default class NavBar extends Component {
  constructor (props) {
    super (props);
    this.state = {
      pendingFriends: [],
      pendingInvites: [],
    }
  }
  componentWillMount () {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    userInfo ?
      (
        axios.get(`/api/friend/${userInfo.id}`, config)
        .then(result => {
          this.setState({pendingFriends: result.data});
        }),
        axios.get(`/api/attendant/pendingInvites/${userInfo.id}`, config)
        .then(result => {
          this.setState({pendingInvites: result.data});
        })
      )
    : null;
  }
  render () {
    return (
      <div id="nav-bar">
        <AppBar
          title="Eventay"
          iconClassNameRight="muidocs-icon-navigation-expand-more">
          <SearchBar
            onChange={() => console.log('onChange')}
            onRequestSearch={() => console.log('onRequestSearch')}
            style={{
              margin: '0 auto',
              maxWidth: 800
            }}
          />
          <div id="notifications">
            <Badge
              badgeContent={
                this.state.pendingFriends.length + this.state.pendingInvites.length
              }
              secondary={true}
              badgeStyle={{top: 12, right: 12}}
            >
              <IconButton tooltip="Notifications">
                <NotificationsIcon />
              </IconButton>
            </Badge>
          </div>
        </AppBar>
      </div>
    );
  }
}
