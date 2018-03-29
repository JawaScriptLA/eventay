import React from 'react';

import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const TimeRanges = props => {
  // TODO (after testing): update hardcoded component values
  return (
    <div>
      <h2>I'd like my event to occur some time between...</h2>
      <div>
        <DatePicker
          floatingLabelText="Date range (start)"
          firstDayOfWeek={0}
          locale="en-US"
          autoOk={true}
          value={props.startDate}
          onChange={(nullArg, newDate) => {
            props.handleDateChanges(newDate, 'startDate');
          }}
        />

        <SelectField
          floatingLabelText="Hour"
          // value={props.startHours}
          value={12}
          maxHeight={200}
          onChange={(e, key, value) => {
            props.handleDropdownChanges('startHours', value);
          }}
        >
          <MenuItem value={1} primaryText="1" />
          <MenuItem value={2} primaryText="2" />
          <MenuItem value={3} primaryText="3" />
          <MenuItem value={4} primaryText="4" />
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={6} primaryText="6" />
          <MenuItem value={7} primaryText="7" />
          <MenuItem value={8} primaryText="8" />
          <MenuItem value={9} primaryText="9" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={11} primaryText="11" />
          <MenuItem value={12} primaryText="12" />
        </SelectField>
        <SelectField
          floatingLabelText="Minutes"
          // value={props.startMinutes}
          value={0}
          onChange={(e, key, value) => {
            props.handleDropdownChanges('startMinutes', value);
          }}
        >
          <MenuItem value={0} primaryText="00" />
          <MenuItem value={30} primaryText="30" />
        </SelectField>
        <SelectField
          floatingLabelText="AM/PM"
          // value={props.startAMPM}
          value={0}
          onChange={(e, key, value) => {
            props.handleDropdownChanges('startAMPM', value);
          }}
        >
          <MenuItem value={0} primaryText="AM" />
          <MenuItem value={1} primaryText="PM" />
        </SelectField>
      </div>
      <div>
        <h2>and...</h2>
        <DatePicker
          floatingLabelText="Date range (end)"
          firstDayOfWeek={0}
          locale="en-US"
          autoOk={true}
          value={props.endDate}
          onChange={(nullArg, newDate) => {
            props.handleDateChanges(newDate, 'endDate');
          }}
        />
        <SelectField
          floatingLabelText="Hour"
          // value={props.endHours}
          value={12}
          maxHeight={200}
          onChange={(e, key, value) => {
            props.handleDropdownChanges('endHours', value);
          }}
        >
          <MenuItem value={1} primaryText="1" />
          <MenuItem value={2} primaryText="2" />
          <MenuItem value={3} primaryText="3" />
          <MenuItem value={4} primaryText="4" />
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={6} primaryText="6" />
          <MenuItem value={7} primaryText="7" />
          <MenuItem value={8} primaryText="8" />
          <MenuItem value={9} primaryText="9" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={11} primaryText="11" />
          <MenuItem value={12} primaryText="12" />
        </SelectField>
        <SelectField
          floatingLabelText="Minutes"
          // value={props.endMinutes}
          value={0}
          onChange={(e, key, value) => {
            props.handleDropdownChanges('endMinutes', value);
          }}
        >
          <MenuItem value={0} primaryText="00" />
          <MenuItem value={30} primaryText="30" />
        </SelectField>
        <SelectField
          floatingLabelText="AM/PM"
          // value={props.endAMPM}
          value={0}
          onChange={(e, key, value) => {
            props.handleDropdownChanges('endAMPM', value);
          }}
        >
          <MenuItem value={0} primaryText="AM" />
          <MenuItem value={1} primaryText="PM" />
        </SelectField>
      </div>
    </div>
  );
};

export default TimeRanges;
