import React, { Component } from 'react';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';

BigCalendar.momentLocalizer(moment);

const myEventsList = ['Going to bae']

export default class Calendar extends Component {
  render () {
    return (
      <div>
        <BigCalendar
          events={myEventsList}
        />
      </div>
    );
  }
}
