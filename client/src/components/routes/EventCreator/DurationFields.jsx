import React from 'react';
import TextField from 'material-ui/TextField';

const DurationFields = props => {
  return (
    <div>
      <h2>Specify duration:</h2>
      <TextField
        floatingLabelText="Enter # of hours..."
        name="durationHrs"
        value={props.durationHrs}
        onChange={props.handleTextChanges}
        style={{ margin: '2%' }}
      />
      <TextField
        floatingLabelText="Enter # of minutes..."
        name="durationMins"
        value={props.durationMins}
        onChange={props.handleTextChanges}
        style={{ margin: '2%' }}
      />
    </div>
  );
};

export default DurationFields;
