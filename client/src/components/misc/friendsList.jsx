import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as friendsActions from '../../actions/friendsActions';
import * as userInfoActions from '../../actions/userInfoActions';
import PropTypes from 'prop-types';

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(localStorage.getItem('userInfo'));
    props.userInfoActions.receiveUserInfo(user);
    this.getFriendsList();
  }

  getFriendsList() {
    this.props.friendsActions.fetchFriendsList(this.props.userInfo.id);
  }

  renderData(item) {
    console.log('renderdata:', item);
    return <div key={item.id}>{item.username}</div>;
  } 

  render() {
    // this.getFriendsList();
    if (this.props.friendsList.length) {
      return this.props.friendsList.map(friend => this.renderData(friend));
    } else if (!Array.isArray(this.props.friendsList)){
      this.getFriendsList();
      return <div>Loading...</div>
    } else {
      return <div>No friends at the moment</div>
    }
  }
}

FriendsList.propTypes = {
  friendsActions: PropTypes.object,
  friendsList: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    friendsList: state.friendsList,
    userInfo: state.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    friendsActions: bindActionCreators(friendsActions, dispatch),
    userInfoActions: bindActionCreators(userInfoActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsList);