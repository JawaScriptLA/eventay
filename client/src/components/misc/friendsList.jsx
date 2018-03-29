import React from 'react';
import { connect } from 'react-redux';
import { Chip, Avatar, List, ListItem } from 'material-ui';
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

    this.state = {
      enableForChat: false,
    }
  }

  componentWillMount() {
    this.props.history ? this.setState({ enableForChat: false }) : this.setState({ enableForChat: true });
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
      <ListItem
        primaryText={item.username}
        leftAvatar={<Avatar src={item.profile_picture} />}
        onClick={
          this.props.history ?
          () => this.props.history.push(`/profile/${item.username}`) :
          () => this.props.handleChatWindow(item)
        }
        value={item.username}
        key={item.id}
      />
    );
  }

  render() {
    if (this.props.friendsList.length) {
      return (
        <div>
          <strong>Friends</strong> <br />
          <List style={{ maxHeight: '10em', overflow: 'scroll', width: '20%', border: '1px solid #d3d3d3'}} >
            {this.props.friendsList.map(friend => this.renderData(friend))}
          </List>
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
