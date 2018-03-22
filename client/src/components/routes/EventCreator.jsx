import React from 'react';
import axios from 'axios';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';

const optionsStyle = {
  maxWidth: 255,
  marginRight: 'auto'
};
export default class EventCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFriends: [],
      durationMins: 0,
      durationHrs: 0,
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
  }

  generateRecommendations() {
    console.log('CURRENT STATE IS', this.state);
    // issue axios request
    this.setState({ generatedTimes: true });
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
          Enter # hours:
          <input
            type="number"
            name="hours"
            value={this.state.durationHrs}
            onChange={this.handleInputChanges}
            min="0"
            max="24"
          />
        </div>
        <div>
          Enter # minutes:
          <input
            type="number"
            name="minutes"
            value={this.state.durationMins}
            onChange={this.handleInputChanges}
            min="0"
            max="59"
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
