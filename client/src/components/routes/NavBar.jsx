import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Popover from 'material-ui/Popover';
import NavMenu from './NavMenu.jsx';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Search from './Search.jsx';
import axios from 'axios';

import Dialog from 'material-ui/Dialog';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';


export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: { headers: { Authorization: 'bearer ' + localStorage.token } },
      open: false,
      pendingFriends: [],
      pendingInvites: [],
      userInfo: {},
      openNotifs: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleNotifsClose = this.handleNotifsClose.bind(this);
    this.handleNotifsOpen = this.handleNotifsOpen.bind(this);
    this.handleNotifInvite = this.handleNotifInvite.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({ open: true, anchorEl: e.currentTarget });
  }

  handleRequestClose() {
    this.setState({ open: false });
  }

  componentWillMount() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    userInfo
      ? (this.setState({ userInfo: userInfo }),
        axios.get(`/api/friend/${userInfo.id}`, this.state.config).then(result => {
          this.setState({ pendingFriends: result.data });
        }),
        axios
          .get(`/api/attendant/pendingInvites/${userInfo.id}`, this.state.config)
          .then(result => {
            this.setState({ pendingInvites: result.data });
          }))
      : null;
  }

  handleNotifsClose () {
    this.setState( {openNotifs: false} );
  }

  handleNotifsOpen () {
    this.setState( {openNotifs: true} );
  }

  cleanupNotifs (elem, notification) {
    this.state[notification].forEach((obj, i) => {
      if (obj.id === elem) {
        var some = this.state[notification].slice();
        some.splice(i, 1);
        this.setState({[notification]: some})
      }
    })
  }

  renderNotifs () {
    let content = [];
    let counter = 0;

    if (!(this.state.pendingFriends.length) && !(this.state.pendingInvites)) {
      return (<p>You're all caught up! Great!</p>);
    }

    if (this.state.pendingFriends.length) {
      content.push(<h3 key='friend-notifs'>Friend Invites</h3>);
      content.push(
        <List key='friend-notifs-list'>
          {
            this.state.pendingFriends.map((notif, i) => {
              counter++;
              return (
                <ListItem
                  id={counter}
                  key={counter}
                  disabled={true}
                  leftAvatar={
                    <Avatar src={notif.profile_picture} />
                  }
                >
                  <a
                    key={counter}
                    href={`/profile/${notif.username}`}
                    style={ {
                      textDecoration: 'none',
                      color: '#000000'
                    } }
                  >
                  {notif.username}
                  </a>                  
                  <div
                    style={ {float: 'right'} }
                  >
                    <FlatButton
                      value={notif.username}
                      label="Accept"
                      onClick={ () =>
                        this.handleNotifInvite(
                          'friend',
                          'accept',
                          {user_id: `${this.state.userInfo.id}`,
                            target_id: `${notif.id}`,
                            status: 'accepted'},
                          notif.id
                        )
                      }
                    />
                    <FlatButton
                      value={notif.username}
                      label="Deny"
                      onClick={ () =>
                        this.handleNotifInvite(
                          'friend',
                          'deny',
                          {user_id: `${notif.id}`,
                          target_id: `${this.state.userInfo.id}`},
                          notif.id
                        )}
                    />
                  </div>
                </ListItem>
            );
            })
          }
        </List>
      );
    }

    if (this.state.pendingInvites.length) {
      content.push(<h3 key='event-notifs'>Event Invites</h3>);
      content.push(
        <List key='event-notifs-list'>
          {
            this.state.pendingInvites.map((notif, i) => {
              counter++;
              return (
                <ListItem
                  key={counter}
                  disabled={true}
                  leftAvatar={
                    <Avatar src={notif.thumbnail} />
                  }
                >
                  <a
                    key={counter}
                    href={`/event/${notif.id}`}
                    style={ {
                      textDecoration: 'none',
                      color: '#000000'
                    } }
                  >
                  {notif.title}
                  </a>
                  <div
                    style={ {float: 'right'} }
                  >
                    <FlatButton
                      value={notif.title}
                      label="Accept"
                      onClick={ () =>
                        this.handleNotifInvite(
                          'event',
                          'accept',
                          {
                            user_id: `${this.state.userInfo.id}`,
                            event_id: `${notif.id}`,
                            status: 'going'
                          },
                          notif.id
                        )
                      }
                    />
                    <FlatButton
                      value={notif.title}
                      label="Maybe"
                      onClick={() =>
                        this.handleNotifInvite(
                          'event',
                          'maybe',
                          {
                            user_id: `${this.state.userInfo.id}`,
                            event_id: `${notif.id}`,
                            status: 'maybe'
                          }
                        )
                      }
                    />
                    <FlatButton
                      value={notif.title}
                      label="Decline"
                      onClick={() =>
                        this.handleNotifInvite(
                          'event',
                          'deny',
                          {
                            user_id: `${this.state.userInfo.id}`,
                            event_id: `${notif.id}`
                          },
                          notif.id
                        )
                      }
                    />
                  </div>
                </ListItem>
              )
            }
          )
          }
        </List>
      );
    }

    return content;
  }

  handleNotifInvite (inviteType, decision, content, elem) {
    if (inviteType === 'friend') {
      if (decision === 'accept') {
        axios.put(`/api/friend/`, content, this.state.config)
          .then(result => {
            this.cleanupNotifs(elem, 'pendingFriends');
          })
          .catch(err => {throw err});
      } else if (decision === 'deny') {
        const payload = {
          data: content,
          headers: this.state.config.headers,
        }
        axios.delete(`/api/friend/`, payload)
          .then(result => {
            this.cleanupNotifs(elem, 'pendingFriends');
          });
      }
    } else if (inviteType === 'event') {
      if (decision === 'accept') {
        axios.put(`/api/attendant`, content, this.state.config)
          .then(result => {
            this.cleanupNotifs(elem, 'pendingInvites');
          });
      } else if (decision === 'deny') {
        const payload = {
          data: content,
          headers: this.state.config.headers,
        };
        axios.delete(`/api/attendant`, payload)
          .then(result => {
            this.cleanupNotifs(elem, 'pendingInvites');
          });
      }
    }
  }

  render() {
    return (
      <div id="nav-bar">
        <AppBar
          style={{
            backgroundImage: 'linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%)',
          }}
          title={
            <span
              style={{
                fontFamily: 'Stalemate, cursive',
                fontSize: '2.7em',
              }}
              onClick={
                () => this.props.history.push('/')}
            >Eventé</span>
          }
          onLeftIconButtonClick={this.handleClick}
          >
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            onRequestClose={this.handleRequestClose}
          >
            <NavMenu history={this.props.history} />
          </Popover>

          <Search history={this.props.history} userInfo={this.state.userInfo} />
          <div
            id="notifications"
            onClick={this.handleNotifsOpen}
          >
            <IconButton
              style={{
                marginRight: '-10px',
                marginTop: '10px',
              }}
              tooltip="Notifications">
              <NotificationsIcon />
            </IconButton>
            {
              (this.state.pendingFriends.length +
              this.state.pendingInvites.length) > 0 ?
                (<Badge
                  badgeContent={
                    this.state.pendingFriends.length +
                    this.state.pendingInvites.length
                  }
                  secondary={true}
                  badgeStyle={{ top: 12, right: 12 }}
                >
                </Badge>)
                : null
            }
          </div>
          <Dialog
            title='Notifications'
            modal={false}
            open={this.state.openNotifs}
            onRequestClose={this.handleNotifsClose}
          >
            {this.renderNotifs()}
          </Dialog>
        </AppBar>
      </div>
    );
  }
}
