import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import axios from 'axios';

import styles from 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

BigCalendar.momentLocalizer(moment);

let formats = {
  dayFormat: 'ddd' + ' ' + 'DD',
  dayRangeHeaderFormat: ({ start, end }, culture, local) =>
    local.format(start, 'MMM DD', culture) + ' - ' + local.format(end, 'MMM DD', culture),
  dateFormat: (date, culture, local) =>
    local.format(date, 'DD', culture),
  eventTimeRangeFormat: ({ start, end }, culture, local) =>
    local.format(start, 'h:mm a', culture) + ' - ' + local.format(end, 'h:mm a', culture),
};

export default class Calendar extends Component {
  constructor (props) {
    super (props);
  }
  render () {
    const eventsList = [
      {
        id: 1,
        title: 'Coding in the Rain',
        start: new Date(2018, 2, 22, 9, 0, 0, 0),
        end: new Date(2018, 2, 22, 20, 0, 0, 0),
        desc: 'Getting work done.'
      }
    ];
    return (
      <div id="calendar">
        <BigCalendar
          {...this.props}
          culture='en'
          formats={formats}
          events={eventsList}
          views={['month', 'week']}
          startAccessor='start'
          endAccessor='end'
          defaultDate={new Date(2018, 2, 22)}
          showMultiDayTimes
        />
      </div>
    );
  }
}
