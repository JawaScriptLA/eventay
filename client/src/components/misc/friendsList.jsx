import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as friendsActions from '../../actions/friendsActions';
import PropTypes from 'prop-types';
import React from 'react';

class FriendsList extends React.Component {
  componentWillMount() {
    this.props.friendsActions.fetchFriendsList();
  }

  renderData(item) {
    return <div key={item[0].id}>{item[0].username}</div>;
  } 

  render() {
    if (this.props.friendsList.length) {
      return this.props.friendsList.map(friend => this.renderData(friend));
    } else {
      return <div>Loading...</div>
    }
  }
}

FriendsList.propTypes = {
  userId: PropTypes.number, // TODO
  friendsActions: PropTypes.object,
  friendsList: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    friendsList: state.friendsList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    friendsActions: bindActionCreators(friendsActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsList);