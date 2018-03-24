import React from 'react';
import axios from 'axios';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const optionsStyle = {
  maxWidth: 255,
  marginRight: 'auto'
};
export default class EventCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFriends: [],
      // possibleTimes: [],
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
    this.calculateTotalTime = this.calculateTotalTime.bind(this);
    this.generateRecommendations = this.generateRecommendations.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.handleDateChanges = this.handleDateChanges.bind(this);
    this.handleDropdownChanges = this.handleDropdownChanges.bind(this);
    this.handleTextChanges = this.handleTextChanges.bind(this);
  }

  calculateTotalTime(dateAsMilliseconds, hours, minutes, ampm) {
    return new Date(
      dateAsMilliseconds + hours * 3600000 + minutes * 60000 + ampm * 43200000
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

    axios
      .post(
        '/api/schedule/showRecommendedTimes',
        {
          selectedFriends: this.state.selectedFriends,
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
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({ generatedTimes: true });
  }

  createEvent() {
    console.log('creating an event!');
    // issue axios post request
  }

  handleDateChanges(newDate, stateKey) {
    this.setState({ [stateKey]: newDate });
  }

  handleDropdownChanges(stateKey, value) {
    this.setState({ [stateKey]: value });
  }

  handleTextChanges(e) {
    this.setState({ [e.target.name]: e.target.value });
    setTimeout(() => console.log(this.state), 1000);
  }

  addFriendToList() {
    // update state to add friend to state (selectedFriends)
  }

  render() {
    return (
      <div>
        <h1>This is the event creator page!</h1>
        <h2>I'd like my event to occur some time between...</h2>
        <div>
          <DatePicker
            floatingLabelText="Date range (start)"
            firstDayOfWeek={0}
            locale="en-US"
            autoOk={true}
            value={this.state.startDate}
            onChange={(nullArg, newDate) => {
              this.handleDateChanges(newDate, 'startDate');
            }}
          />

          <SelectField
            floatingLabelText="Hour"
            value={this.state.startHours}
            maxHeight={200}
            onChange={(e, key, value) => {
              this.handleDropdownChanges('startHours', value);
            }}
          >
            <MenuItem value={1} primaryText="1" />
            <MenuItem value={2} primaryText="2" />
            <MenuItem value={3} primaryText="3" />
            <MenuItem value={4} primaryText="4" />
            <MenuItem value={5} primaryText="5" />
            <MenuItem value={6} primaryText="6" />
            <MenuItem value={7} primaryText="7" />
            <MenuItem value={8} primaryText="8" />
            <MenuItem value={9} primaryText="9" />
            <MenuItem value={10} primaryText="10" />
            <MenuItem value={11} primaryText="11" />
            <MenuItem value={12} primaryText="12" />
          </SelectField>
          <SelectField
            floatingLabelText="Minutes"
            value={this.state.startMinutes}
            onChange={(e, key, value) => {
              this.handleDropdownChanges('startMinutes', value);
            }}
          >
            <MenuItem value={0} primaryText="00" />
            <MenuItem value={30} primaryText="30" />
          </SelectField>
          <SelectField
            floatingLabelText="AM/PM"
            value={this.state.startAMPM}
            onChange={(e, key, value) => {
              this.handleDropdownChanges('startAMPM', value);
            }}
          >
            <MenuItem value={0} primaryText="AM" />
            <MenuItem value={1} primaryText="PM" />
          </SelectField>
        </div>
        <div>
          <h2>and...</h2>
          <DatePicker
            floatingLabelText="Date range (end)"
            firstDayOfWeek={0}
            locale="en-US"
            autoOk={true}
            value={this.state.endDate}
            onChange={(nullArg, newDate) => {
              this.handleDateChanges(newDate, 'endDate');
            }}
          />
          <SelectField
            floatingLabelText="Hour"
            value={this.state.endHours}
            maxHeight={200}
            onChange={(e, key, value) => {
              this.handleDropdownChanges('endHours', value);
            }}
          >
            <MenuItem value={1} primaryText="1" />
            <MenuItem value={2} primaryText="2" />
            <MenuItem value={3} primaryText="3" />
            <MenuItem value={4} primaryText="4" />
            <MenuItem value={5} primaryText="5" />
            <MenuItem value={6} primaryText="6" />
            <MenuItem value={7} primaryText="7" />
            <MenuItem value={8} primaryText="8" />
            <MenuItem value={9} primaryText="9" />
            <MenuItem value={10} primaryText="10" />
            <MenuItem value={11} primaryText="11" />
            <MenuItem value={12} primaryText="12" />
          </SelectField>
          <SelectField
            floatingLabelText="Minutes"
            value={this.state.endMinutes}
            onChange={(e, key, value) => {
              this.handleDropdownChanges('endMinutes', value);
            }}
          >
            <MenuItem value={0} primaryText="00" />
            <MenuItem value={30} primaryText="30" />
          </SelectField>
          <SelectField
            floatingLabelText="AM/PM"
            value={this.state.endAMPM}
            onChange={(e, key, value) => {
              this.handleDropdownChanges('endAMPM', value);
            }}
          >
            <MenuItem value={0} primaryText="AM" />
            <MenuItem value={1} primaryText="PM" />
          </SelectField>
        </div>

        <h2>Add duration (hours and minutes)</h2>
        <div>
          <TextField
            hintText="Enter # of hours"
            name="durationHrs"
            value={this.state.durationHrs}
            onChange={this.handleTextChanges}
          />
          <TextField
            hintText="Enter # of minutes"
            name="durationMins"
            value={this.state.durationMins}
            onChange={this.handleTextChanges}
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
