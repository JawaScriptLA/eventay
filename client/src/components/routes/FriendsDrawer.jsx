import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as friendsActions from '../../actions/friendsActions';
import * as userInfoActions from '../../actions/userInfoActions';
import propTypes from 'prop-types';

class FriendsDrawer extends Component {
  constructor (props) {
    super (props);
    
    const user = JSON.parse(localStorage.getItem('userInfo'));
    props.userInfoActions.receiveUserInfo(user);
    this.getFriendsList();

    this.state = { open: false };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle () {this.setState({open: !this.state.open})};

  getFriendsList() {
    if (this.props.userInfo.id) {
      this.props.friendsActions.fetchFriendsList(this.props.userInfo.id);
    } else {
      const user = JSON.parse(localStorage.getItem('userInfo'));
      user
        ? this.props.friendsActions.fetchFriendsList(user.id)
        : this.props.history.push('/login');
    }
  }

  showFriends () {
    if (this.props.friendsList.length) {
      return this.props.friendsList.map(friend => (
        <MenuItem
          leftAvatar={<Avatar src={friend.profile_picture} />}
          onClick={
            this.props.invite ? this.props.invite :
            this.props.history ?
            () => this.props.history.push(`/profile/${friend.username}`) :
            null
          }
          value={friend.username}
          key={friend.id}
        ><p style={{display: 'inline-block', marginLeft: '60px'}}>{friend.username}</p></MenuItem>
      ));
    } else {
      return <MenuItem>Search to add friends!</MenuItem>;
    }
  }
  render () {
    return (
      <div>
        <RaisedButton
          label="See Friends"
          onClick={this.handleToggle}
          style={{marginLeft: '10%', marginTop: '1%'}}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
        {
          this.showFriends()
        }
        </Drawer>
      </div>
    );
  }
}

FriendsDrawer.propTypes = {
  friendsActions: propTypes.object,
  friendsList: propTypes.any
};

const mapStateToProps = state => {
  return {
    friendsList: state.friendsList,
    userInfo: state.userInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    friendsActions: bindActionCreators(friendsActions, dispatch),
    userInfoActions: bindActionCreators(userInfoActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsDrawer);
