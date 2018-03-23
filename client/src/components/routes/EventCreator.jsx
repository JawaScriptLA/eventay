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

    const tuple = [[start, end]];
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
          <SelectField
            floatingLabelText="Hour"
            value={this.state.value}
            onChange={this.handleChange}
            maxHeight={200}
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
            value={this.state.value}
            onChange={this.handleChange}
          >
            <MenuItem value={1} primaryText="00" />
            <MenuItem value={2} primaryText="30" />
          </SelectField>
          <SelectField
            floatingLabelText="AM/PM"
            value={this.state.value}
            onChange={this.handleChange}
          >
            <MenuItem value={1} primaryText="AM" />
            <MenuItem value={2} primaryText="PM" />
          </SelectField>
        </div>
        <div>
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
          <SelectField
            floatingLabelText="Hour"
            value={this.state.value}
            onChange={this.handleChange}
            maxHeight={200}
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
            value={this.state.value}
            onChange={this.handleChange}
          >
            <MenuItem value={1} primaryText="00" />
            <MenuItem value={2} primaryText="30" />
          </SelectField>
          <SelectField
            floatingLabelText="AM/PM"
            value={this.state.value}
            onChange={this.handleChange}
          >
            <MenuItem value={1} primaryText="AM" />
            <MenuItem value={2} primaryText="PM" />
          </SelectField>
        </div>

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
