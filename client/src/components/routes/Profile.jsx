import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { 
  Paper,
  TextField,
  Divider,
  Card,
  CardActions,
  CardHeader,
  CardTitle,
  CardText,
  Avatar,
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
      isFriend: false,
      bioInputField: '',
      bioDisplay: '',
      profilePicInputField: '',
      renderUpdateProfile: false,
      renderProfilePicPopover: false,
      popoverAnchorEl: null,
      renderURLInput: false,
      urlPopoverAnchorEl: null,
    }

    this.handleProfileModalOpen = this.handleProfileModalOpen.bind(this);
    this.handleProfileModalClose = this.handleProfileModalClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUpdateBio = this.handleUpdateBio.bind(this);
    this.handleProfilePicPopoverOpen = this.handleProfilePicPopoverOpen.bind(this);
    this.handleProfilePicPopoverClose = this.handleProfilePicPopoverClose.bind(this);
    this.handleURLInputOpen = this.handleURLInputOpen.bind(this);
    this.handleURLInputClose = this.handleURLInputClose.bind(this);
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
            bioInputField: response.data[0].bio || '',
            bioDisplay: response.data[0].bio || '',
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

  handleProfileModalOpen() {
    this.setState({
      bioInputField: this.state.profileInfo.bio,
      renderUpdateProfile: true,
    });
  }

  handleProfileModalClose() {
    this.setState({
      renderUpdateProfile: false,
    });
  }

  handleProfilePicPopoverOpen(e) {
    e.preventDefault();
    this.setState({
      popoverAnchorEl: e.currentTarget,
      renderProfilePicPopover: true,
    })
  }

  handleProfilePicPopoverClose() {
    this.setState({
      renderProfilePicPopover: false,
    })
  }
  
  handleInputChange(e) {
    console.log(e.target.name, e.target.files);
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleURLInputOpen(e) {
    this.setState({
      urlPopoverAnchorEl: e.currentTarget,
      renderURLInput: true,
    });
  }

  handleURLInputClose() {
    this.setState({ 
      renderURLInput: false,
    });
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
          this.handleProfileModalClose();
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
            title={this.state.profileInfo.username}
            subtitle={this.state.bioDisplay}
            avatar={
              <Avatar
                src={this.state.profileInfo.profile_picture}
                size={200}
              />}
            />
          <Dialog
            title="Update your profile"
            modal={false}
            open={this.state.renderUpdateProfile}
            onRequestClose={this.handleProfileModalClose}
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
              <RaisedButton
                label="Update Profile picture"
                labelPosition="before"
                style={{ margin: 12 }}
                containerElement="label"
                onClick={this.handleProfilePicPopoverOpen}
              >
                <Popover
                  open={this.state.renderProfilePicPopover}
                  anchorEl={this.state.popoverAnchorEl}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  onRequestClose={this.handleProfilePicPopoverClose}
                >
                  <Menu>
                    <MenuItem primaryText="Provide URL" onClick={this.handleURLInputOpen} />
                    <MenuItem primaryText="Choose from device" />
                  </Menu>
                </Popover>
              </RaisedButton>
              <Divider />
            </Paper>
          </Dialog>
          <ProfileButtons
            isFriend={this.state.isFriend}
            isSelf={this.state.isSelf}
            handleProfileModalOpen={this.handleProfileModalOpen}
          />
        </Card>
      );
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
