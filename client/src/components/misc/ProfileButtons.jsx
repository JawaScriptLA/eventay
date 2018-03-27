import React from 'react' 
import { CardActions, FlatButton } from 'material-ui';

class ProfileButtons extends React.Component {
  constructor(props) {
    super(props)

    this.renderButtons = this.renderButtons.bind(this);
  }

  renderButtons() {
    if (this.props.isSelf) {
      return (
        <span>
          <FlatButton label="Update Bio" onClick={this.props.handleProfileBioModalOpen} />
          <FlatButton label="Update Photo" onClick={this.props.handleProfilePhotoModalOpen} />
          <FlatButton label="Create Event" onClick={() => this.props.history.push('/create')} />
        </span>
      );
    } else if (this.props.isFriend) {
      return (
        <span>
          <FlatButton label="Remove Friend" onClick={this.props.handleRemoveFriend} />
          <FlatButton label="Send Message" onClick={() => console.log('Send Message clicked')} />
          <FlatButton label="Invite" onClick={() => console.log('Invite clicked')} />
          <FlatButton label="Block" onClick={this.props.handleBlockUser} />
        </span>
      );
    } else {
      return (
        <span>
          <FlatButton
            label={this.props.isFriendPending ?
              (this.props.canAcceptFriendRequest ?
              "Accept request" :
              "Cancel request" ) :
              "Add Friend"}
            onClick={this.props.isFriendPending ?
              (this.props.canAcceptFriendRequest ?
                this.props.handleAcceptFriendReq :
                this.props.handleRemoveFriend) :
                this.props.handleAddFriend}
          />
          <FlatButton label="Block" onClick={this.props.handleBlockUser} />
        </span>
      )
    }
  }

  render() {
    return(
      <CardActions>
        {this.renderButtons()}
      </CardActions>
    )

  }
}

export default ProfileButtons;