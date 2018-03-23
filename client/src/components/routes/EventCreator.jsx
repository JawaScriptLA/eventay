import React from 'react';
import axios from 'axios';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const optionsStyle = {
  maxWidth: 255,
  marginRight: 'auto'
};
export default class EventCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFriends: [],
      possibleTimes: [],
      durationMins: '',
      durationHrs: '',
      generatedTimes: false,
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null
    };
    this.generateRecommendations = this.generateRecommendations.bind(this);
    this.handleInputChanges = this.handleInputChanges.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.handleTimeChanges = this.handleTimeChanges.bind(this);
    this.calculateTotalTime = this.calculateTotalTime.bind(this);
  }

  calculateTotalTime(dateAsMilliseconds, hours, minutes) {
    return new Date(dateAsMilliseconds + hours * 3600000 + minutes * 60000);
  }

  generateRecommendations() {
    // let startDate = this.statesetState({
    //   possibleTimes: []
    // });
    // console.log(this.state.startDate);
    // let startTime = new Date(this.state.startTime);
    // let hours = this.state.startTime.getHours();
    // let minutes = this.state.startTime.getMinutes();

    // let dateAsMilliseconds = this.state.startDate.getTime();
    // let hours = this.state.startTime.getHours();
    // let minutes = this.state.startTime.getMinutes();
    const start = this.calculateTotalTime(
      this.state.startDate.getTime(),
      this.state.startTime.getHours(),
      this.state.startTime.getMinutes()
    );
    const end = this.calculateTotalTime(
      this.state.endDate.getTime(),
      this.state.endTime.getHours(),
      this.state.endTime.getMinutes()
    );

    const tuple = [start, end];
    this.setState({ possibleTimes: tuple }, () => {
      axios
        .post(
          '/api/schedule/showRecommendedTimes',
          {
            selectedFriends: this.state.selectedFriends,
            durationMins: Number(this.state.durationMins),
            durationHrs: Number(this.state.durationHrs),
            possibleTimes: this.state.possibleTimes
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
      this.setState({ generatedTimes: true });
    });
  }

  createEvent() {
    console.log('creating an event!');
    // issue axios post request
  }

  componentWillMount() {
    console.log(this.props);
  }

  handleInputChanges(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleTimeChanges(newDate, stateKey) {
    this.setState({ [stateKey]: newDate });
  }

  addFriendToList() {
    // update state to add friend to state (selectedFriends)
  }

  render() {
    return (
      <div>
        <h1>This is the EVENT CREATOR page!</h1>
        <h2>Add possible time range(s)</h2>
        <div>
          <DatePicker
            floatingLabelText="Date range (start)"
            firstDayOfWeek={0}
            locale="en-US"
            autoOk={true}
            value={this.state.startDate}
            onChange={(empty, newTime) => {
              this.handleTimeChanges(newTime, 'startDate');
            }}
          />
          <TimePicker
            hintText="Time range (start)"
            value={this.state.startTime}
            onChange={(empty, newTime) => {
              this.handleTimeChanges(newTime, 'startTime');
            }}
          />
        </div>
        <DatePicker
          floatingLabelText="Date range (end)"
          firstDayOfWeek={0}
          locale="en-US"
          autoOk={true}
          value={this.state.endDate}
          onChange={(empty, newTime) => {
            this.handleTimeChanges(newTime, 'endDate');
          }}
        />
        <TimePicker
          hintText="Time range (end)"
          value={this.state.endTime}
          onChange={(empty, newTime) => {
            this.handleTimeChanges(newTime, 'endTime');
          }}
        />

        <h2>Add duration (hours and minutes)</h2>
        <div>
          <TextField
            hintText="Enter # of hours"
            name="durationHrs"
            value={this.state.durationHrs}
            onChange={this.handleInputChanges}
          />
          <TextField
            hintText="Enter # of minutes"
            name="durationMins"
            value={this.state.durationMins}
            onChange={this.handleInputChanges}
          />
        </div>
        <h2>Add invitees</h2>
        <RaisedButton
          label="Generate recommended times"
          primary={true}
          onClick={this.generateRecommendations}
        />
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
