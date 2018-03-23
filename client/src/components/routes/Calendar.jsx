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

const config = {
  headers: { 'Authorization': 'bearer ' + localStorage.token}
};
export default class Calendar extends Component {
  constructor (props) {
    super (props);
    this.state ={
      events: [],
    }
  }
  componentDidMount () {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    userInfo ?
    axios.get(`/api/event/${userInfo.id}`, config)
      .then(result => {
        result = result.data.map(event => {
          var obj = {};
          obj.id = event.id;
          obj.title = event.title;
          obj.start = new Date(event.start_time);
          obj.end = new Date(event.end_time);
          obj.desc = event.description;
          return obj;
        });
        this.setState({events: result})
      })
      : this.props.history.push('/login');
  }
  render () {
    return (
      <div id="calendar">
        <BigCalendar
          {...this.props}
          culture='en'
          formats={formats}
          events={this.state.events}
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
