import React from 'react';
import axios from 'axios';
import DurationFields from './DurationFields.jsx';
import FriendsTable from './FriendsTable.jsx';
import NavBar from '../NavBar.jsx';
import TimeRanges from './TimeRanges.jsx';

import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class EventCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allFriends: [],
      selectedFriendIds: [],
      selectedRowIds: [],
      recommendedTimes: [],
      selectedTime: ['', ''],
      durationMins: '',
      durationHrs: '',
      generatedTimes: false,
      startDate: null,
      startHours: null,
      startMinutes: null,
      startAMPM: null,
      endDate: null,
      endHours: null,
      endMinutes: null,
      endAMPM: null
    };
    this.getAllFriends();
    this.calculateTotalTime = this.calculateTotalTime.bind(this);
    this.generateRecommendations = this.generateRecommendations.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.handleDateChanges = this.handleDateChanges.bind(this);
    this.handleDropdownChanges = this.handleDropdownChanges.bind(this);
    this.handleTextChanges = this.handleTextChanges.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.handleRecommendationClick = this.handleRecommendationClick.bind(this);
  }

  handleRecommendationClick(newTime) {
    console.log('recommendation clicked!', newTime);
    this.setState({ selectedTime: newTime });
  }

  isSelected(index) {
    return this.state.selectedRowIds.indexOf(index) !== -1;
  }

  getAllFriends() {
    const ownId = JSON.parse(localStorage.getItem('userInfo')).id;
    axios
      .get(`/api/friends/${ownId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res => {
        const friendIds = [];
        for (let idx in res.data) {
          friendIds.push([res.data[idx].id, res.data[idx].username]);
        }
        this.setState({ allFriends: friendIds });
      })
      .catch(err => console.log(err));
  }

  calculateTotalTime(dateAsMilliseconds, hours, minutes, ampm) {
    return new Date(
      dateAsMilliseconds +
        (hours % 12) * 3600000 +
        minutes * 60000 +
        ampm * 43200000
    );
  }

  generateRecommendations() {
    const start = this.calculateTotalTime(
      this.state.startDate.getTime(),
      this.state.startHours,
      this.state.startMinutes,
      this.state.startAMPM
    );
    const end = this.calculateTotalTime(
      this.state.endDate.getTime(),
      this.state.endHours,
      this.state.endMinutes,
      this.state.endAMPM
    );

    const timeRange = [[start, end]];
    const durationAsMilliseconds =
      (Number(this.state.durationHrs) * 60 + Number(this.state.durationMins)) *
      60000;
    const ownId = JSON.parse(localStorage.getItem('userInfo')).id;
    const invitees = [...this.state.selectedFriendIds, ownId];
    axios
      .post(
        '/api/schedule/showRecommendedTimes',
        {
          selectedFriendIds: invitees,
          durationAsMilliseconds: durationAsMilliseconds,
          timeRange: timeRange
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      .then(res => {
        console.log('res.data is:', res.data);
        let recommendations = [];
        for (let recommendationId in res.data) {
          recommendations.push(res.data[recommendationId]);
        }
        this.setState({ recommendedTimes: recommendations });
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({ generatedTimes: true });
  }

  createEvent() {
    const ownId = JSON.parse(localStorage.getItem('userInfo')).id;
    axios
      .post(
        '/api/event',
        {
          // TODO: update to real event title
          title: 'jasonEvent1',
          start_time: this.state.selectedTime[0],
          end_time: this.state.selectedTime[1],
          host_id: ownId
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      .then(res => {
        let newEventId = res.data[0].id;
        for (let currId of this.state.selectedFriendIds) {
          console.log('[axios] currId is:', currId);
          axios.post(
            '/api/attendant',
            {
              user_id: currId,
              invitor_id: ownId,
              event_id: newEventId
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }
          );
        }
      })
      .then(res => {
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleDateChanges(newDate, stateKey) {
    this.setState({ [stateKey]: newDate });
  }

  handleDropdownChanges(stateKey, value) {
    this.setState({ [stateKey]: value });
  }

  handleSelectionChange(selectedRows) {
    let updatedUserIds = [];
    let updatedRowIds = [];
    if (selectedRows === 'all') {
      this.state.allFriends.forEach((friend, idx) => {
        updatedUserIds.push(friend[0]);
        updatedRowIds.push(idx);
      });
    } else if (selectedRows !== 'none') {
      updatedRowIds = selectedRows;
      selectedRows.forEach(row => {
        updatedUserIds.push(this.state.allFriends[row][0]);
      });
    }
    this.setState({
      selectedFriendIds: updatedUserIds,
      selectedRowIds: updatedRowIds
    });
  }

  handleTextChanges(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    console.log('state is:', this.state);
    return (
      <div>
        <NavBar history={this.props.history} />
        <h1>This is the event creator page!</h1>

        <TimeRanges
          handleDateChanges={this.handleDateChanges}
          handleDropdownChanges={this.handleDropdownChanges}
          startDate={this.state.startDate}
          startHours={this.state.startHours}
          startMinutes={this.state.startMinutes}
          startAMPM={this.state.startAMPM}
          endDate={this.state.endDate}
          endHours={this.state.endHours}
          endMinutes={this.state.endMinutes}
          endAMPM={this.state.endAMPM}
        />

        <DurationFields
          durationHrs={this.state.durationHrs}
          durationMins={this.state.durationMins}
          handleTextChanges={this.handleTextChanges}
        />
        <FriendsTable
          allFriends={this.state.allFriends}
          handleSelectionChange={this.handleSelectionChange}
          isSelected={this.isSelected}
        />
        <RaisedButton
          label="Generate recommended times"
          primary={true}
          onClick={this.generateRecommendations}
        />
        <div>
          {this.state.recommendedTimes &&
            this.state.recommendedTimes.map((time, idx) => (
              <div
                key={idx}
                onClick={() =>
                  this.handleRecommendationClick([time[0], time[1]])
                }
              >
                {time[0]} - {time[1]}
              </div>
            ))}
        </div>
        <div>
          {this.state.generatedTimes && (
            <RaisedButton
              label="Create event!"
              onClick={this.createEvent}
              fullWidth={true}
            />
          )}
        </div>
      </div>
    );
  }
}
