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
           onClick={() => this.props.history.push(`/event/${event.id}`)}
         /> 
       )
    )
  }

  render() {
    console.log(this.props.events);
    return (
      <List>
        <Subheader>Events</Subheader>
        {this.renderEvents(this.props.events)}
      </List>
    );
  }
};

export default EventList;
