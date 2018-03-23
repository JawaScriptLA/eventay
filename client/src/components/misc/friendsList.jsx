import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as friendsActions from '../../actions/friendsActions';
import * as userInfoActions from '../../actions/userInfoActions';
import propTypes from 'prop-types';

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(localStorage.getItem('userInfo'));
    props.userInfoActions.receiveUserInfo(user);
    this.getFriendsList();
  }

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

  renderData(item) {
    return (
      <div
        onClick={() => this.props.history.push(`/profile/${item.username}`)}
        key={item.id}
      >
        {item.username}
      </div>
    );
  }

  render() {
    console.log(this.props.friendsList);
    if (this.props.friendsList.length) {
      return (
        <div>
          <strong>Friends</strong>
          {this.props.friendsList.map(friend => this.renderData(friend))}
        </div>
      );
    } else {
      return <div>No friends at the moment</div>;
    }
  }
}

FriendsList.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
