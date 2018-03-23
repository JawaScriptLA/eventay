import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
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
    this.state = {
      profileInfo: {},
      invalidUser: false,
    }
  }

  componentWillMount() {
    const config = {
      headers: { 'Authorization': 'bearer ' + localStorage.token }
    }
    axios.get(`/api/user/${this.props.match.params.username}`, config)
      .then(response => {
        if (response.status === 200 && response.data.length) {
          this.setState({
            profileInfo: response.data[0],
          });
        } else {
          this.setState({
            invalidUser: true,
          })
        }
      });
  }

  render() {
    if (!this.state.invalidUser) {
      // user is valid
      return <div>{this.state.profileInfo.username}'s profile</div>
    } else {
      return <div>The user does not exist or is blocking you from seeing this :(</div>
    }
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
