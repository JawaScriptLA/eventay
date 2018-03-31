import React from 'react';
import axios from 'axios';
import { convertTime, calculateTotalTime } from '../../../../../utils/utils.js';

import DurationFields from './DurationFields.jsx';
import FriendsTable from './FriendsTable.jsx';
import NavBar from '../NavBar.jsx';
import TimeRanges from './TimeRanges.jsx';
import BasicEventInfo from './BasicEventInfo.jsx';
import TimeOptions from './TimeOptions.jsx';

import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

export default class EventCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: '',
      eventDescription: '',
      eventLocation: '',
      eventIsPublic: false,
      allFriends: [],
      selectedFriendIds: [],
      selectedRowIds: [],
      selectedFriendNames: [],
      recommendedTimes: [],
      selectedTimeRowId: [],
      selectedTime: ['', ''],
      durationMins: '',
      durationHrs: '',
      startDate: null,
      endDate: null,

      excludeWeekends: false,
      excludeOvernight: false,
      excludeWorkday: false,

      stepIndex: 0,
      dialogOpen: false,
      firstNextClicked: false,
      secondNextClicked: false,
      authHeader: { headers: { Authorization: 'Bearer ' + localStorage.token } }
    };
    this.getAllFriends();
    this.generateRecommendations = this.generateRecommendations.bind(this);
    this.createEvent = this.createEvent.bind(this);

    // Stepper
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);

    // Fields
    this.handleDateChanges = this.handleDateChanges.bind(this);
    this.handleDropdownChanges = this.handleDropdownChanges.bind(this);
    this.handleTextChanges = this.handleTextChanges.bind(this);
    this.handleToggleChanges = this.handleToggleChanges.bind(this);

    // Tables
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.handleSelectionChange2 = this.handleSelectionChange2.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.isSelected2 = this.isSelected2.bind(this);

    // Dialog box
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

    // Checkbox
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  getAllFriends() {
    const ownId = JSON.parse(localStorage.getItem('userInfo')).id;
    axios
      .get(`/api/friends/${ownId}`, this.state.authHeader)
      .then(res => {
        const friendIds = [];
        for (let idx in res.data) {
          friendIds.push([res.data[idx].id, res.data[idx].username]);
        }
        this.setState({ allFriends: friendIds });
      })
      .catch(err => console.log(err));
  }

  generateRecommendations() {
    const startMilliseconds = this.state.startDate.getTime();
    const endMilliseconds = this.state.endDate.getTime();

    const durationAsMilliseconds =
      (Number(this.state.durationHrs) * 60 + Number(this.state.durationMins)) *
      60000;
    const ownId = JSON.parse(localStorage.getItem('userInfo')).id;
    const invitees = [...this.state.selectedFriendIds, ownId];
    axios
      .post(
        '/api/schedule/showRecommendedTimes',
        {
          startMilliseconds: startMilliseconds,
          endMilliseconds: endMilliseconds,
          selectedFriendIds: invitees,
          durationAsMilliseconds: durationAsMilliseconds,
          excludeWeekends: this.state.excludeWeekends,
          excludeOvernight: this.state.excludeOvernight,
          excludeWorkday: this.state.excludeWorkday
        },
        this.state.authHeader
      )
      .then(res => {
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

  createEvent() {
    const ownId = JSON.parse(localStorage.getItem('userInfo')).id;
    axios
      .post(
        '/api/event',
        {
          // TODO: add thumbnail to post request
          title: this.state.eventName,
          description: this.state.eventDescription,
          location: this.state.eventLocation,
          // thumbnail:,
          start_time: this.state.selectedTime[0],
          end_time: this.state.selectedTime[1],
          publicity: this.state.eventIsPublic,
          host_id: ownId
        },
        this.state.authHeader
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
            this.state.authHeader
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

  handleNext() {
    console.log('next button clicked');
    const { stepIndex } = this.state;
    if (stepIndex === 0) {
      this.setState({ firstNextClicked: true });
      if (!this.state.eventName.length) {
        return;
      }
    }
    if (stepIndex === 1) {
      this.setState({ secondNextClicked: true });
      if (!this.state.startDate || !this.state.endDate) {
        return;
      }
    }

    if (stepIndex < 3) {
      this.setState({
        stepIndex: stepIndex + 1
      });
    }
  }

  handlePrev() {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  }

  handleDateChanges(newDate, stateKey) {
    this.setState({ [stateKey]: newDate });
  }

  handleDropdownChanges(stateKey, value) {
    this.setState({ [stateKey]: value });
  }

  handleTextChanges(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleToggleChanges(e, toggle) {
    this.setState({ [e.target.name]: toggle });
  }

  handleOpen() {
    this.setState({ dialogOpen: true });
  }

  handleClose() {
    this.setState({ dialogOpen: false });
  }

  handleCheckbox(e, isChecked) {
    this.setState({ [e.target.name]: isChecked });
  }

  isSelected(index) {
    return this.state.selectedRowIds.indexOf(index) !== -1;
  }

  isSelected2(index) {
    return this.state.selectedTimeRowId.indexOf(index) !== -1;
  }

  handleSelectionChange(selectedRows) {
    let updatedUserIds = [];
    let updatedFriendNames = [];
    let updatedRowIds = [];
    if (selectedRows === 'all') {
      this.state.allFriends.forEach((friend, idx) => {
        updatedUserIds.push(friend[0]);
        updatedFriendNames.push(friend[1]);
        updatedRowIds.push(idx);
      });
    } else if (selectedRows !== 'none') {
      updatedRowIds = selectedRows;
      selectedRows.forEach(row => {
        updatedUserIds.push(this.state.allFriends[row][0]);
        updatedFriendNames.push(this.state.allFriends[row][1]);
      });
    }
    this.setState({
      selectedFriendIds: updatedUserIds,
      selectedRowIds: updatedRowIds,
      selectedFriendNames: updatedFriendNames
    });
  }

  handleSelectionChange2(selectedRow, startTime, endTime) {
    if (!startTime) {
      this.setState({
        selectedTimeRowId: [],
        selectedTime: ['', '']
      });
    } else {
      let newTime = [startTime, endTime];
      this.setState({
        selectedTimeRowId: selectedRow,
        selectedTime: newTime
      });
    }
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <BasicEventInfo
            eventName={this.state.eventName}
            eventDescription={this.state.eventDescription}
            eventLocation={this.state.eventLocation}
            eventIsPublic={this.state.eventIsPublic}
            handleTextChanges={this.handleTextChanges}
            handleToggleChanges={this.handleToggleChanges}
            firstNextClicked={this.state.firstNextClicked}
          />
        );
      case 1:
        return (
          <div>
            <TimeRanges
              handleDateChanges={this.handleDateChanges}
              handleDropdownChanges={this.handleDropdownChanges}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              secondNextClicked={this.state.secondNextClicked}
            />
            <DurationFields
              durationHrs={this.state.durationHrs}
              durationMins={this.state.durationMins}
              handleTextChanges={this.handleTextChanges}
            />

            <TimeOptions
              excludeWeekends={this.state.excludeWeekends}
              excludeOvernight={this.state.excludeOvernight}
              excludeWorkday={this.state.excludeWorkday}
              handleCheckbox={this.handleCheckbox}
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
        const actions = [
          <FlatButton label="Edit" primary={true} onClick={this.handleClose} />,
          <RaisedButton
            label="Create event!"
            primary={true}
            onClick={() => {
              this.handleClose();
              this.createEvent();
            }}
          />
        ];
        return (
          <div>
            <Table
              height="500px"
              onRowSelection={rowIds => {
                let time1, time2;
                if (this.state.recommendedTimes[rowIds]) {
                  time1 = this.state.recommendedTimes[rowIds][0];
                  time2 = this.state.recommendedTimes[rowIds][1];
                } else {
                  time1 = null;
                  time2 = null;
                }
                this.handleSelectionChange2(rowIds, time1, time2);
              }}
            >
              <TableHeader displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>Start time</TableHeaderColumn>
                  <TableHeaderColumn>End time</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody showRowHover={true} deselectOnClickaway={false}>
                {this.state.recommendedTimes.map((time, idx) => (
                  <TableRow selected={this.isSelected2(idx)} key={idx}>
                    <TableRowColumn>{convertTime(time[0])}</TableRowColumn>
                    <TableRowColumn>{convertTime(time[1])}</TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Dialog
              title="Review details"
              actions={actions}
              open={this.state.dialogOpen}
              onRequestClose={this.handleClose}
            >
              <div>Event name: {this.state.eventName}</div>
              <div>Description: {this.state.eventDescription || 'N/A'}</div>
              <div>Location: {this.state.eventLocation || 'N/A'}</div>
              <div>Start time: {convertTime(this.state.selectedTime[0])}</div>
              <div>End time: {convertTime(this.state.selectedTime[1])}</div>
              <div>
                Publicity:{' '}
                {(this.state.eventIsPublic && <span>public</span>) || (
                  <span>private</span>
                )}
              </div>
              <div>
                Invited Friends: {this.state.selectedFriendNames.join(', ')}
              </div>
            </Dialog>
          </div>
        );
      default:
        return;
    }
  }

  render() {
    console.log('state is:', this.state);
    return (
      <div>
        <NavBar history={this.props.history} />
        <h1>Create new event!</h1>
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
          </Stepper>
          <div>
            <div>{this.getStepContent(this.state.stepIndex)}</div>
            <div style={{ margin: '3% 20% 5% 0', float: 'right' }}>
              <FlatButton
                label="Back"
                disabled={this.state.stepIndex === 0}
                onClick={this.handlePrev}
                style={{ marginRight: 12 }}
              />
              <RaisedButton
                label={this.state.stepIndex === 3 ? 'Finish' : 'Next'}
                primary={true}
                onClick={() => {
                  if (this.state.stepIndex === 2) {
                    this.generateRecommendations();
                  }
                  if (this.state.stepIndex === 3) {
                    this.handleOpen();
                  }
                  this.handleNext();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
