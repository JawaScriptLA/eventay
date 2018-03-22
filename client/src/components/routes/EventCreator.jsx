import React from 'react';

export default class EventCreator extends React.Component {
  componentWillMount() {
    console.log(this.props);
  }
  
  render() {
    return <div>Create Event</div>;
  }
}
