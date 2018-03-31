import React from 'react';

import DatePicker from 'material-ui/DatePicker';

const TimeRanges = props => {
  return (
    <div>
      <h2>I'd like my event to occur between:</h2>
      <div>
        {/* TODO: make date pickers on same line */}
        <DatePicker
          floatingLabelText="Date range (start)"
          firstDayOfWeek={0}
          locale="en-US"
          autoOk={true}
          value={props.startDate}
          onChange={(nullArg, newDate) => {
            props.handleDateChanges(newDate, 'startDate');
          }}
          errorText={
            props.secondNextClicked && !props.startDate
              ? 'Start date is required'
              : null
          }
          style={{ display: 'inline-block', margin: '2%' }}
        />
        <DatePicker
          floatingLabelText="Date range (end)"
          firstDayOfWeek={0}
          locale="en-US"
          autoOk={true}
          value={props.endDate}
          onChange={(nullArg, newDate) => {
            props.handleDateChanges(newDate, 'endDate');
          }}
          errorText={
            props.secondNextClicked && !props.endDate
              ? 'End date is required'
              : null
          }
          style={{ display: 'inline-block', margin: '2%' }}
        />
      </div>
    </div>
  );
};

export default TimeRanges;
