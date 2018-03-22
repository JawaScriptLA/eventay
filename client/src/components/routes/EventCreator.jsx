import React from 'react';

class EventCreator extends React.Component{
  componentWillMount() {
    console.log(this.props);
  }
  
  render() {
    return <div>Create Event</div>
  }
 }

export default EventCreator;
