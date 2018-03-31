import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import axios from 'axios';

import styles from 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

BigCalendar.momentLocalizer(moment);

let formats = {
  dayFormat: 'ddd' + ' ' + 'DD',
  dayRangeHeaderFormat: ({ start, end }, culture, local) =>
    local.format(start, 'MMM DD', culture) +
    ' - ' +
    local.format(end, 'MMM DD', culture),
  dateFormat: (date, culture, local) => local.format(date, 'DD', culture),
  eventTimeRangeFormat: ({ start, end }, culture, local) =>
    local.format(start, 'h:mm a', culture) +
    ' - ' +
    local.format(end, 'h:mm a', culture)
};

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = { events: [] };
  }

  componentWillMount() {
    const config = {
      headers: { Authorization: 'bearer ' + localStorage.token }
    };
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      axios
        .get(`/api/event/${userInfo.id}`, config)
        .then(({ data }) => {
          data.forEach(event => {
            event.desc = event.description;
            event.start = new Date(event.start_time);
            event.end = new Date(event.end_time);
          });
          this.setState({ events: data });
        })
        .catch(err => {
          console.log('Error:', err);
        });
    }
  }

  selectEvent(event) {
    this.props.history.push({
      pathname: `/event/${event.id}`,
      state: { event: event }
    });
  }

  render() {
    return (
      <div id="calendar">
        <BigCalendar
          {...this.props}
          culture="en"
          formats={formats}
          events={this.state.events}
          onSelectEvent={this.selectEvent}
          views={['month', 'week']}
          startAccessor="start"
          endAccessor="end"
          defaultDate={new Date()}
          showMultiDayTimes
          popup={true}
        />
      </div>
    );
  }
}
