import React from 'react';

import TextField from 'material-ui/TextField';

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
    </div>
  );
};

export default BasicEventInfo;
