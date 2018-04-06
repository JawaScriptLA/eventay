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
        .get(`/api/attendants/${userInfo.id}`, config)
        .then(({ data }) => {
          data = data.filter(event => event.status !== 'pending');
          for (let i = 0; i < data.length; i++) {
            axios
              .get(`/api/event/eventinfo/${data[i].event_id}`, config)
              .then(({ data: [event] }) => {
                event.desc = event.description;
                event.start = new Date(event.start_time);
                event.end = new Date(event.end_time);
                event.status = data[i].status;
                let events = this.state.events;
                events.push(event);
                this.setState({ events: events });
              });
          }
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

  eventPropGetter(event) {
    return {
      style: {
        backgroundColor:
          event.status === 'maybe'
            ? '#E8DEDE'
            : event.status === 'declined' ? '#FE0000' : '#01FFFF'
      }
    };
  }

  render() {
    console.log(this.state.events);
    return (
      <div
        id="calendar"
        style={{
          marginLeft: '10%',
          marginRight: '10%',
        }}
      >
        <BigCalendar
          style={{
            fontSize: '1.5em',
          }}
          {...this.props}
          culture="en"
          formats={formats}
          events={this.state.events}
          eventPropGetter={this.eventPropGetter}
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
