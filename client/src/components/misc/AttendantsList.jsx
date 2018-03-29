import React, { Component } from 'react';

export default class AttendantsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    console.log('attendants:', this.props.attendants);
  }

  render() {
    return (
      <div>
        
      </div>
    );
  }
}