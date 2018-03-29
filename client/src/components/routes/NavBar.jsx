import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Popover from 'material-ui/Popover';
import NavMenu from './NavMenu.jsx';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Search from './Search.jsx';
import axios from 'axios';

import Popup from 'reactjs-popup';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      pendingFriends: [],
      pendingInvites: [],
      userInfo: {}
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({ open: true, anchorEl: e.currentTarget });
  }

  handleRequestClose() {
    this.setState({ open: false });
  }

  componentWillMount() {
    const config = {
      headers: { Authorization: 'bearer ' + localStorage.token }
    };
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    userInfo
      ? (this.setState({ userInfo: userInfo }),
        axios.get(`/api/friend/${userInfo.id}`, config).then(result => {
          this.setState({ pendingFriends: result.data });
        }),
        axios
          .get(`/api/attendant/pendingInvites/${userInfo.id}`, config)
          .then(result => {
            this.setState({ pendingInvites: result.data });
          }))
      : null;
  }

  render() {
    return (
      <div id="nav-bar">
        <AppBar title={<span onClick={() => this.props.history.push('/')}>Eventay</span>} onLeftIconButtonClick={this.handleClick}>
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            onRequestClose={this.handleRequestClose}
          >
            <NavMenu history={this.props.history} />
          </Popover>

          <Search userInfo={this.state.userInfo} />

          <Popup
            modal
            trigger={
              <div id="notifications">
                <Badge
                  badgeContent={
                    this.state.pendingFriends.length +
                    this.state.pendingInvites.length
                  }
                  secondary={true}
                  badgeStyle={{ top: 12, right: 12 }}
                >
                  <IconButton tooltip="Notifications">
                    <NotificationsIcon />
                  </IconButton>
                </Badge>
              </div>
            }
            on="click"
            closeOnDocumentClick
          >
            <div>
              <ul>
                {this.state.pendingFriends.map((notif, i) => (
                  <li key={i}>{notif.username}</li>
                ))}
                {this.state.pendingInvites.map((notif, i) => (
                  <li key={i}>{notif.title}</li>
                ))}
              </ul>
            </div>
          </Popup>
        </AppBar>
      </div>
    );
  }
}
