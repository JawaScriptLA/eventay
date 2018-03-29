import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import {
  TextField,
  Divider,
  Card,
  CardHeader,
  Avatar,
  Paper,
  Dialog
} from 'material-ui';
import ReactFilestack, { client } from 'filestack-react';
import RaisedButton from 'material-ui/RaisedButton';
import propTypes from 'prop-types';
import * as profileActions from '../../actions/profileActions';
import * as userInfoActions from '../../actions/userInfoActions';
import EventList from '../misc/eventList.jsx';
import ProfileButtons from '../misc/ProfileButtons.jsx';
import filestack from '../../../config.js';
import NavBar from './NavBar.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    // persist user info to app state upon hard refresh
    const user = JSON.parse(localStorage.getItem('userInfo'));
    props.userInfoActions.receiveUserInfo(user);
    this.state = {
      profileInfo: {},
      invalidUser: false,
      isFriendPending: false,
      isFriend: false,
      canAcceptFriendRequest: false,
      isSelf: false,
      renderUpdateProfile: false,
      renderProfilePicPopover: false,
      popoverAnchorEl: null,
      renderURLInput: false,
      urlPopoverAnchorEl: null,
      bioInputField: '',
      bioDisplay: '',
      profilePicURL: '',
      events: [],
      authHeader: { headers: { Authorization: 'bearer ' + localStorage.token } }
    };

    this.handleProfileBioModalOpen = this.handleProfileBioModalOpen.bind(this);
    this.handleProfileBioModalClose = this.handleProfileBioModalClose.bind(
      this
    );
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUpdateBio = this.handleUpdateBio.bind(this);
    this.handleUpdatePhoto = this.handleUpdatePhoto.bind(this);
    this.handleProfilePhotoModalOpen = this.handleProfilePhotoModalOpen.bind(
      this
    );
    this.handleProfilePhotoModalClose = this.handleProfilePhotoModalClose.bind(
      this
    );
    this.handleAddFriend = this.handleAddFriend.bind(this);
    this.handleRemoveFriend = this.handleRemoveFriend.bind(this);
    this.handleBlockUser = this.handleBlockUser.bind(this);
    this.handleAcceptFriendReq = this.handleAcceptFriendReq.bind(this);
  }

  componentWillReceiveProps() {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    console.log('cwrp: ', this.props.match.params.username);
    // get user info
    axios
      .get(
        `/api/user/${this.props.match.params.username}`,
        this.state.authHeader
      )
      .then(response => {
        if (response.status === 200 && response.data) {
          this.setState({
            profileInfo: response.data,
            bioInputField: response.data.bio || '',
            bioDisplay: response.data.bio || ''
          });
          if (
            response.data.username === this.props.userInfo.username &&
            response.data.id === this.props.userInfo.id
          ) {
            this.getEvents(this.props.userInfo.id);
            this.setState({
              isSelf: true
            });
          }

          // check if user is a friend
          axios
            .get(
              `/api/friend/check/${user.id}/${response.data.id}`,
              this.state.authHeader
            )
            .then(check => {
              if (check.data.length) {
                if (check.data[0].status === 'accepted') {
                  this.getEvents(response.data.id);
                  this.setState({ isFriend: true, isFriendPending: false });
                } else if (check.data[0].status === 'pending') {
                  console.log('friendship pending');
                  if (check.data[0].target_id === user.id) {
                    console.log('canAcceptRequest');
                    this.setState({
                      isFriend: false,
                      isFriendPending: true,
                      canAcceptFriendRequest: true
                    });
                  } else {
                    this.setState({
                      isFriend: false,
                      isFriendPending: true,
                      canAcceptFriendRequest: false
                    });
                  }
                } else if (check.data[0].status === 'blocked') {
                  this.setState({ invalidUser: true });
                }
              }
            });
        } else {
          this.setState({
            invalidUser: true
          });
        }
      });
  }

  handleAddFriend() {
    axios
      .post(
        '/api/friend',
        {
          user_id: this.props.userInfo.id,
          target_id: this.state.profileInfo.id
        },
        this.state.authHeader
      )
      .then(response => this.setState({ isFriendPending: true }));
  }

  handleRemoveFriend() {
    const payload = {
      data: {
        user_id: this.props.userInfo.id,
        target_id: this.state.profileInfo.id
      },
      headers: this.state.authHeader.headers
    };
    axios
      .delete('/api/friend', payload)
      .then(response =>
        this.setState({ isFriendPending: false, isFriend: false })
      );
  }

  handleAcceptFriendReq() {
    axios
      .put(
        '/api/friend',
        {
          user_id: this.props.userInfo.id,
          target_id: this.state.profileInfo.id,
          status: 'accepted'
        },
        this.state.authHeader
      )
      .then(response =>
        this.setState({
          isFriendPending: false,
          isFriend: true,
          canAcceptFriendRequest: false
        })
      );
  }

  handleBlockUser() {
    axios.put('/api/friend', {
      user_id: this.props.userInfo.id,
      target_id: this.state.profileInfo.id,
      status: 'blocked',
    }, this.state.authHeader)
      .then(response => this.setState({ isFriendPending: false, isFriend: false, canAcceptFriendRequest: false, invalidUser: true }));
  }

  handleProfileBioModalOpen() {
    this.setState({
      bioInputField: this.state.profileInfo.bio,
      renderUpdateProfile: true
    });
  }

  handleProfileBioModalClose() {
    this.setState({
      renderUpdateProfile: false
    });
  }

  handleProfilePhotoModalOpen() {
    this.setState({
      renderProfilePicPopover: true
    });
  }

  handleProfilePhotoModalClose() {
    this.setState({
      renderProfilePicPopover: false
    });
  }

  handleUpdatePhoto(photo) {
    const url = photo.filesUploaded.url;
    // todo update bio info
    axios
      .put(
        `/api/user`,
        {
          profile_picture: url,
          username: this.props.userInfo.username // to prevent user from changing other people's bio
        },
        this.state.authHeader
      )
      .then(response => {
        const user = Object.assign({}, this.state.profileInfo);
        user.profile_picture = response.data.profile_picture;
        this.setState({ profileInfo: user });
        this.handleProfilePhotoModalClose();
      });
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleUpdateBio(e) {
    if (e.key === 'Enter' && this.state.isSelf) {
      // todo update bio info
      axios
        .put(
          `/api/user`,
          {
            bio: this.state.bioInputField,
            username: this.props.userInfo.username // to prevent user from changing other people's bio
          },
          this.state.authHeader
        )
        .then(response => {
          this.setState({ bioDisplay: response.data.bio });
          this.handleProfileBioModalClose();
        });
    }
  }

  getEvents(userId) {
    // console.log('userId', userId)
    axios
      .get(`/api/event/${userId}`, this.state.authHeader)
      .then(response => this.setState({ events: response.data }));
  }

  render() {
    // console.log(this.state);
    if (!this.state.invalidUser) {
      return (
        <div>
          <NavBar history={this.props.history} />
          <Card
            style={{
              margin: 'auto',
              width: '80%',
            }}
          >
            <CardHeader
              title={<h1>{this.state.profileInfo.username}</h1>}
              subtitle={this.state.bioDisplay}
              avatar={
                <Avatar
                  src={this.state.profileInfo.profile_picture}
                  style={{ objectFit: 'cover ' }}
                  size={200}
                />
              }
            />
            <Dialog
              title="Update your bio"
              modal={false}
              open={this.state.renderUpdateProfile}
              onRequestClose={this.handleProfileBioModalClose}
            >
              <Paper zDepth={1}>
                <TextField
                  hintText="Bio"
                  name="bioInputField"
                  onChange={this.handleInputChange}
                  onKeyDown={this.handleUpdateBio}
                  value={this.state.bioInputField}
                  style={{ marginLeft: 20 }}
                  underlineShow={false}
                />
                <Divider />
              </Paper>
            </Dialog>
            <Dialog
              title="Update your photo"
              modal={false}
              open={this.state.renderProfilePicPopover}
              onRequestClose={this.handleProfilePhotoModalClose}
            >
              <ReactFilestack
                apikey={filestack.API_KEY}
                buttonText="Upload"
                render={({ onPick }) => (
                  <RaisedButton label="Upload" onClick={onPick} />
                )}
                onSuccess={this.handleUpdatePhoto}
              />
            </Dialog>
            <ProfileButtons
              history={this.props.history}
              isFriendPending={this.state.isFriendPending}
              isFriend={this.state.isFriend}
              isSelf={this.state.isSelf}
              canAcceptFriendRequest={this.state.canAcceptFriendRequest}
              handleProfileBioModalOpen={this.handleProfileBioModalOpen}
              handleProfilePhotoModalOpen={this.handleProfilePhotoModalOpen}
              handleAddFriend={this.handleAddFriend}
              handleBlockUser={this.handleBlockUser}
              handleRemoveFriend={this.handleRemoveFriend}
              handleAcceptFriendReq={this.handleAcceptFriendReq}
            />
            {this.state.isSelf || this.state.isFriend ? (
              <EventList
                isSelf={this.state.isSelf}
                isFriend={this.state.isFriend}
                events={this.state.events}
                history={this.props.history}
              />
            ) : null}
          </Card>
        </div>
      );
    } else {
      return (
        <div>
          <NavBar history={this.props.history} />
          The user does not exist or is blocking you from seeing this :(
        </div>
      );
    }
  }
}

Profile.propTypes = {};

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
    profileInfo: state.profileInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    profileActions: bindActionCreators(profileActions, dispatch),
    userInfoActions: bindActionCreators(userInfoActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
