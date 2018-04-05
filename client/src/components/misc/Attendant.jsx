import React, { Component } from 'react';

export default class Attendant extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <img src={this.props.attendant.profile_picture}/><br/>
        {this.props.attendant.username}<br/>
        {this.props.attendant.status}
      </div>
    );
  }
}