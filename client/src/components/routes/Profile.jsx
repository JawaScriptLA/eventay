import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { 
  TextField,
  Divider,
  Card,
  CardActions,
  CardMedia,
  CardHeader,
  CardTitle,
  CardText,
  Avatar,
  Paper,
  RaisedButton,
  Dialog,
  Popover,
  Menu,
  MenuItem,
 } from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import propTypes from 'prop-types';
import * as profileActions from '../../actions/profileActions';
import * as userInfoActions from '../../actions/userInfoActions';
import ProfileButtons from '../misc/ProfileButtons.jsx'

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
      renderUpdateProfile: false,
      renderProfilePicPopover: false,
      popoverAnchorEl: null,
      renderURLInput: false,
      urlPopoverAnchorEl: null,
      bioInputField: '',
      bioDisplay: '',
      profilePicURL: '',
    }

    this.handleProfileBioModalOpen = this.handleProfileBioModalOpen.bind(this);
    this.handleProfileBioModalClose = this.handleProfileBioModalClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUpdateBio = this.handleUpdateBio.bind(this);
    this.handleUpdatePhoto = this.handleUpdatePhoto.bind(this);
    this.handleProfilePhotoModalOpen = this.handleProfilePhotoModalOpen.bind(this);
    this.handleProfilePhotoModalClose = this.handleProfilePhotoModalClose.bind(this);

  }

  componentWillMount() {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: { Authorization: 'bearer ' + localStorage.token }
    };
    axios.get(`/api/user/${this.props.match.params.username}`, config)
      .then(response => {
        if (response.status === 200 && response.data.length) {
          this.setState({
            profileInfo: response.data[0],
            bioInputField: response.data[0].bio || '',
            bioDisplay: response.data[0].bio || '',
          });
          if (
            response.data[0].username === this.props.userInfo.username &&
            response.data[0].id === this.props.userInfo.id
          ) {
            this.setState({
              isSelf: true
            });
          }
          axios
            .get(`/api/friend/check/${user.id}/${response.data[0].id}`, config)
            .then(check => {
              check.data.length ? this.setState({ isFriend: true }) : null;
            });
        } else {
          this.setState({
            invalidUser: true
          });
        }
      });
  }

  handleProfileBioModalOpen() {
    this.setState({
      bioInputField: this.state.profileInfo.bio,
      renderUpdateProfile: true,
    });
  }

  handleProfileBioModalClose() {
    this.setState({
      renderUpdateProfile: false,
    });
  }

  handleProfilePhotoModalOpen() {
    this.setState({
      renderProfilePicPopover: true,
    });
  }

  handleProfilePhotoModalClose() {
    this.setState({
      renderProfilePicPopover: false,
    });
  }

  handleUpdatePhoto(e) {
    if (e.key === 'Enter' && this.state.isSelf) {
      const config = {
        headers: { 'Authorization': 'bearer ' + localStorage.token }
      }
      // todo update bio info
      axios.put(`/api/user/profilepic`, {
        profile_pic: this.state.profilePicURL,
        username: this.props.userInfo.username, // to prevent user from changing other people's bio
      }, config)
        .then(response => {
          const user = Object.assign({}, this.state.profileInfo);
          user.profile_picture = response.data[0].profile_picture;
          this.setState({ profileInfo: user });
          this.handleProfilePhotoModalClose();
        });
    }
  }
  
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleUpdateBio(e) {
    if (e.key === 'Enter' && this.state.isSelf) {
      const config = {
        headers: { 'Authorization': 'bearer ' + localStorage.token }
      }
      // todo update bio info
      axios.put(`/api/user/bio`, {
        bio: this.state.bioInputField,
        username: this.props.userInfo.username, // to prevent user from changing other people's bio
      }, config)
        .then(response => {
          this.setState({ bioDisplay: response.data[0].bio });
          this.handleProfileBioModalClose();
        });
    }
  }

  render() {
    if (!this.state.invalidUser) {
      return (
        <Card
          style={{
            margin: 'auto',
            width: '60%',
          }}
        >
          <CardHeader
            title={<h1>{this.state.profileInfo.username}</h1>}
            subtitle={this.state.bioDisplay}
            avatar={
              <Avatar
                src={this.state.profileInfo.profile_picture}
                size={200}
              />}
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
            <Paper zDepth={1}>
              <TextField 
                hintText="Image URL"
                name="profilePicURL"
                onChange={this.handleInputChange}
                onKeyDown={this.handleUpdatePhoto}
                value={this.state.profilePicURL}
                style={{ marginLeft: 20 }}
                underlineShow={false}
              />
              <Divider />
            </Paper>
          </Dialog>
          <ProfileButtons
            history={this.props.history}
            isFriend={this.state.isFriend}
            isSelf={this.state.isSelf}
            handleProfileBioModalOpen={this.handleProfileBioModalOpen}
            handleProfilePhotoModalOpen={this.handleProfilePhotoModalOpen}
          />
        </Card>
      );
    } else {
      return (
        <div>
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
