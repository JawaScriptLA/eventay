import React, { Component } from 'react';
import Attendant from './Attendant.jsx';
import { List } from 'material-ui';

export default class AttendantsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <List style={{ maxHeight: '10em', overflow: 'scroll', width: '20%', border: '1px solid #d3d3d3'}}>
          {this.props.attendants.map((attendant, key) => <Attendant attendant={attendant} key={key} id={key} />)}
        </List>
      </div>
    );
  }
}