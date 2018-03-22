import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as profileActions from '../../actions/profileActions';
import * as userInfoActions from '../../actions/userInfoActions';
import propTypes from 'prop-types';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    // persist user info to app state upon hard refresh
    const user = JSON.parse(localStorage.getItem('userInfo'));
    props.userInfoActions.receiveUserInfo(user);

  }

  render() {
    console.log('profile page: ', this.props);
    return <div>Hello, {this.props.userInfo.username}</div>
  }
}

Profile.propTypes = {

};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    profileInfo: state.profileInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    profileActions: bindActionCreators(profileActions, dispatch),
    userInfoActions: bindActionCreators(userInfoActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);