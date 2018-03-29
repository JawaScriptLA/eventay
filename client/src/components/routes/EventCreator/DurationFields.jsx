import React from 'react';
import TextField from 'material-ui/TextField';

const DurationFields = props => {
  return (
    <div>
      <h2>Add duration (hours and minutes)</h2>
      {/* TODO: modify these to dropdowns */}
      <TextField
        floatingLabelText="Enter # of hours..."
        name="durationHrs"
        value={props.durationHrs}
        onChange={props.handleTextChanges}
      />
      <TextField
        floatingLabelText="Enter # of minutes..."
        name="durationMins"
        value={props.durationMins}
        onChange={props.handleTextChanges}
      />
    </div>
  );
};

export default DurationFields;
