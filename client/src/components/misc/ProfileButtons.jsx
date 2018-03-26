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
          <FlatButton label="Create Event" onClick={() => console.log('create event clicked')} />
        </span>
      );
    } else if (this.props.isFriend) {
      return (
        <span>
          <FlatButton label="Remove Friend" onClick={() => console.log('Remove Friend clicked')} />
          <FlatButton label="Send Message" onClick={() => console.log('Send Message clicked')} />
          <FlatButton label="Invite" onClick={() => console.log('Invite clicked')} />
          <FlatButton label="Block" onClick={() => console.log('Block clicked')} />
        </span>
      );
    } else {
      return (
        <span>
          <FlatButton label="Add Friend" onClick={() => console.log('Add friend clicked')} />
          <FlatButton label="Block" onClick={() => console.log('Block clicked')} />
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