import React from 'react';
import { Card, List, ListItem, Subheader } from 'material-ui';
import ActionPermContactCalendar from 'material-ui/svg-icons/action/perm-contact-calendar';

class EventList extends React.Component{
  constructor(props) {
    super(props);
  }

  renderEvents(events) {
    return (
        events.map(event => 
         <ListItem
           key={event.id}
           primaryText={event.title}
           secondaryText={<p>
             {event.description}<br/>
             <em>{event.start_time}</em>
           </p>}
           rightIcon={<ActionPermContactCalendar />}
           onClick={() => this.props.history.push({
            pathname: `/event/${event.id}`,
            state: { event: event }
          })}
         /> 
       )
    )
  }

  render() {
    return (
      <List
        style={{
          height: '20em',
          overflow: 'scroll',}}
      >
        <Subheader>Events</Subheader>
        {this.renderEvents(this.props.events)}
      </List>
    );
  }
};

export default EventList;
