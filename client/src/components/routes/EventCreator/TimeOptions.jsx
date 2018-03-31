import React from 'react';
import Checkbox from 'material-ui/Checkbox';

const TimeOptions = props => {
  return (
    <div>
      <h2>Additional options:</h2>
      <Checkbox
        label="Exclude weekend times (Saturday/Sunday)"
        name="excludeWeekends"
        checked={props.excludeWeekends}
        onCheck={props.handleCheckbox}
        style={{ margin: '2%' }}
      />
      <Checkbox
        label="Exclude overnight times (11p-6a)"
        name="excludeOvernight"
        checked={props.excludeOvernight}
        onCheck={props.handleCheckbox}
        style={{ margin: '2%' }}
      />
      <Checkbox
        label="Exclude workday times (9a-4p)"
        name="excludeWorkday"
        checked={props.excludeWorkday}
        onCheck={props.handleCheckbox}
        style={{ margin: '2%' }}
      />
    </div>
  );
};

export default TimeOptions;
