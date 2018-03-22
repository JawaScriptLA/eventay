import React from 'react';
import axios from 'axios';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
const optionsStyle = {
  maxWidth: 255,
  marginRight: 'auto'
};
export default class EventCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFriends: [],
      minutes: 0,
      hours: 0,
      generatedTimes: false
    };
    this.generateRecommendations = this.generateRecommendations.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createEvent = this.createEvent.bind(this);
  }

  generateRecommendations() {
    console.log('Generating recommendations!');
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

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  addFriendToList() {
    // update state to add friend to state (selectedFriends)
  }

  render() {
    return (
      <div>
        <h1>This is the EVENT CREATOR page!</h1>
        <h2>Add possible time range(s)</h2>
        <DatePicker
          floatingLabelText="Select preferred start date"
          autoOk={true}
        />
        <DatePicker
          floatingLabelText="Select preferred end date"
          autoOk={true}
        />
        <h2>Add duration (hours and minutes)</h2>
        <div>
          Enter # hours:
          <input
            type="number"
            name="hours"
            value={this.state.hours}
            onChange={this.handleChange}
            min="0"
            max="24"
          />
        </div>
        <div>
          Enter # minutes:
          <input
            type="number"
            name="minutes"
            value={this.state.minutes}
            onChange={this.handleChange}
            min="0"
            max="59"
          />
        </div>
        <h2>Add invitees</h2>
        <div>
          <input
            type="submit"
            value="Generate recommended times"
            onClick={this.generateRecommendations}
          />
        </div>
        {this.state.generatedTimes && (
          <div>
            <input
              type="submit"
              value="Create event!"
              onClick={this.createEvent}
            />
          </div>
        )}
      </div>
    );
  }
}
