import React, { Component } from 'react';
import axios from 'axios';

export default class AttendantsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } }
    };
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