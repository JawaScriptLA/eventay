import React from 'react';
import ReactFilestack, { client } from 'filestack-react';
import filestack from '../../../../config.js';

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
          errorText={
            props.firstNextClicked && !props.eventName.length
              ? 'Event name is required'
              : null
          }
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
      <ReactFilestack
        apikey={filestack.API_KEY2}
        buttonText="Upload event photo"
        options={{
          accept: 'image/*',
          maxFiles: 1,
          fromSources: ['local_file_system', 'imagesearch', 'url']
        }}
        // onSuccess={this.yourCallbackFunction}
      />

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
