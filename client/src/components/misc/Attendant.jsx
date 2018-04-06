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
          onClick={() => this.props.uninvite(this.props.attendant.username)}
          value={`${this.props.attendant.username} ${this.props.attendant.status}`}
          key={this.props.id}
        />
      </div>
    );
  }
}