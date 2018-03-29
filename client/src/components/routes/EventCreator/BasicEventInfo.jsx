import React from 'react';

import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const BasicEventInfo = props => {
  return (
    <div style={{ width: '50%', margin: 'auto' }}>
      <div>
        <TextField
          floatingLabelText="Enter event name here..."
          name="eventName"
          value={props.eventName}
          fullWidth={true}
          onChange={props.handleTextChanges}
        />
      </div>
      <div>
        <TextField
          floatingLabelText="Enter description here..."
          name="eventDescription"
          value={props.eventDescription}
          multiLine={true}
          fullWidth={true}
          onChange={props.handleTextChanges}
        />
      </div>
      <div>
        <TextField
          floatingLabelText="Enter location here..."
          name="eventLocation"
          value={props.eventLocation}
          fullWidth={true}
          onChange={props.handleTextChanges}
        />
      </div>
      <div>ADD THUMBNAIL HERE</div>
      {/* // TODO: use filestack to upload thumbnail */}
      <Toggle
        label="Mark event as public:"
        style={{ marginTop: '5%' }}
        name="eventIsPublic"
        onToggle={(e, isToggled) => props.handleToggleChanges(e, isToggled)}
      />
    </div>
  );
};

export default BasicEventInfo;
