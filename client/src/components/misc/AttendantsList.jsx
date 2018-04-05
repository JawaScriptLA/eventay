import React, { Component } from 'react';
import Attendant from './Attendant.jsx';
import axios from 'axios';

export default class AttendantsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.attendants.map((attendant, key) => <Attendant attendant={attendant} key={key} />)}
      </div>
    );
  }
}