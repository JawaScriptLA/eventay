import React from 'react';

import DatePicker from 'material-ui/DatePicker';
// import TimePicker from 'material-ui/TimePicker';
// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';

const TimeRanges = props => {
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
      </div>

      {/* TODO: move these to bottom of page */}
      <Checkbox
        label="Exclude weekend times"
        name="excludeWeekends"
        checked={props.excludeWeekends}
        onCheck={props.handleCheckbox}
      />
      <Checkbox
        label="Exclude overnight times"
        name="excludeOvernight"
        checked={props.excludeOvernight}
        onCheck={props.handleCheckbox}
      />
      <Checkbox
        label="Exclude workday times"
        name="excludeWorkday"
        checked={props.excludeWorkday}
        onCheck={props.handleCheckbox}
      />
    </div>
  );
};

export default TimeRanges;
