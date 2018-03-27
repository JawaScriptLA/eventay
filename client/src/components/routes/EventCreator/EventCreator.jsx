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
      endAMPM: null,
      stepIndex: 0
    };
    this.getAllFriends();
    this.calculateTotalTime = this.calculateTotalTime.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.generateRecommendations = this.generateRecommendations.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.handleDateChanges = this.handleDateChanges.bind(this);
    this.handleDropdownChanges = this.handleDropdownChanges.bind(this);
    this.handleTextChanges = this.handleTextChanges.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.handleRecommendationClick = this.handleRecommendationClick.bind(this);
  }
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Whats the occasion?';
      // TODO: add fields to enter event details
      case 1:
        return (
          <div>
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
          </div>
        );
      case 2:
        return (
          <div>
            <FriendsTable
              allFriends={this.state.allFriends}
              handleSelectionChange={this.handleSelectionChange}
              isSelected={this.isSelected}
            />
          </div>
        );
      case 3:
        // TODO: reformat times in a readable/clearn format
        return (
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
        );
      case 4:
        return 'Confirm details here!';
      default:
        return;
    }
  }

  handleNext() {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 4
    });
  }

  handlePrev() {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
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
    if (this.state.stepIndex === 2) {
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
        (Number(this.state.durationHrs) * 60 +
          Number(this.state.durationMins)) *
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
    }
  }

  createEvent() {
    if (this.state.stepIndex === 4) {
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
        <div style={{ width: '100%', maxWidth: 1000, margin: 'auto' }}>
          <Stepper activeStep={this.state.stepIndex}>
            <Step>
              <StepLabel>What's the occasion?</StepLabel>
            </Step>
            <Step>
              <StepLabel>Time Preferences</StepLabel>
            </Step>
            <Step>
              <StepLabel>Invite friends</StepLabel>
            </Step>
            <Step>
              <StepLabel>Select time</StepLabel>
            </Step>
            <Step>
              <StepLabel>Confirm</StepLabel>
            </Step>
          </Stepper>
          <div>
            <div>
              <div>{this.getStepContent(this.state.stepIndex)}</div>
              <div style={{ marginTop: 12 }}>
                <FlatButton
                  label="Back"
                  disabled={this.state.stepIndex === 0}
                  onClick={this.handlePrev}
                  style={{ marginRight: 12 }}
                />
                <RaisedButton
                  label={this.state.stepIndex === 4 ? 'Finish' : 'Next'}
                  primary={true}
                  onClick={() => {
                    this.handleNext();
                    this.generateRecommendations();
                    this.createEvent();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
