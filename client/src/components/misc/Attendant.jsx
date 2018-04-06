import React, { Component } from 'react';
import { ListItem, Avatar } from 'material-ui';
import ContentClear from 'material-ui/svg-icons/content/clear';

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
          rightIcon={<ContentClear />}
          onClick={() => this.props.uninvite(this.props.attendant.username)}
          value={`${this.props.attendant.username} ${this.props.attendant.status}`}
          key={this.props.id}
        />
      </div>
    );
  }
}