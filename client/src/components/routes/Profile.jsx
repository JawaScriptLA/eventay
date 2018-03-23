import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText, Avatar} from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
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
      isSelf: false,
      isFriend: false,
    }
  }

  componentWillMount() {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: { 'Authorization': 'bearer ' + localStorage.token }
    }
    axios.get(`/api/user/${this.props.match.params.username}`, config)
      .then(response => {
        if (response.status === 200 && response.data.length) {
          this.setState({
            profileInfo: response.data[0],
          });
          if (response.data[0].username === this.props.userInfo.username && response.data[0].id === this.props.userInfo.id) {
            this.setState({
              isSelf: true,
            });
          }
          axios.get(`/api/friend/check/${user.id}/${response.data[0].id}`, config)
            .then(check => {
              check.data.length ? this.setState({ isFriend: true }) : null
            });
        } else {
          this.setState({
            invalidUser: true,
          });
        }
      });
  }

  render() {
    if (!this.state.invalidUser) {
      if (this.state.isSelf) {
        return (
          <Card>
            <CardHeader
              title={this.state.profileInfo.username}
              subtitle={this.state.profileInfo.bio}
              avatar={
                <Avatar
                  src={this.state.profileInfo.profile_picture}
                  size={200}
                />}
            />
            <CardActions>
              <FlatButton label="Update Profile" />
              <FlatButton label="Settings" />
              <FlatButton label="Create Event" />
            </CardActions>

            <CardTitle title="Your events" subtitle="you will see your events here" />
          </Card>
        );
      } else if (this.state.isFriend) {
        return (
          <Card>
            <CardHeader
              title={this.state.profileInfo.username}
              subtitle={this.state.profileInfo.bio}
              avatar={
              <Avatar
                src={this.state.profileInfo.profile_picture}
                size={200}
              />}
            />
            <CardActions>
              <FlatButton label="Remove Friend" />
              <FlatButton label="Send Message" />
              <FlatButton label="Invite" />
              <FlatButton label="Block" />
            </CardActions>
            <CardTitle title={`${this.state.profileInfo.username}'s events`} subtitle="" />
          </Card>
        );
      } else {
        return (
          <Card>
            <CardHeader
              title={this.state.profileInfo.username}
              subtitle={this.state.profileInfo.bio}
              avatar={
              <Avatar
                src={this.state.profileInfo.profile_picture}
                size={200}
              />}
            />
            <CardActions>
              <FlatButton label="Add Friend" />
              <FlatButton label="Block" />
            </CardActions>
          </Card>
        );
      }
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
  mapDispatchToProps,
)(Profile);
