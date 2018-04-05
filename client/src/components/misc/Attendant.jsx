import React, { Component } from 'react';
import { ListItem, Avatar } from 'material-ui';

export default class Attendant extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <ListItem
          primaryText={this.props.attendant.username}
          leftAvatar={<Avatar src={this.props.attendant.profile_picture} />}
          onClick={
            this.props.invite ? this.props.invite :
            this.props.history ?
            () => this.props.history.push(`/profile/${this.props.attendant.username}`) :
            () => this.props.handleChatWindow(this.props.attendant)
          }
          value={this.props.attendant.username}
          key={this.props.id}
        />
      </div>
    );
  }
}