module.exports = {
  convertTime: input => {
    let newDate = new Date(input);
    let splitDate = newDate.toString().split(' ');
    let day = splitDate[0];
    let month = splitDate[1];
    let date = splitDate[2];
    let year = splitDate[3];
    let dateStr = day + ' ' + month + ' ' + date + ', ' + year + ' ';

    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let timeStr = hours + ':' + minutes + ' ' + ampm;
    return dateStr + timeStr;
  },

  calculateTotalTime: (dateAsMilliseconds, hours, minutes, ampm) => {
    return new Date(
      dateAsMilliseconds +
        (hours % 12) * 3600000 +
        minutes * 60000 +
        ampm * 43200000
    );
  },

  conflictExists: (
    firstStartTime,
    firstEndTime,
    secondStartTime,
    secondEndTime
  ) => {
    let cond1 =
      firstStartTime < secondStartTime && secondStartTime < firstEndTime;
    let cond2 =
      secondStartTime < firstStartTime && firstStartTime < secondEndTime;
    let cond3 =
      secondStartTime <= firstStartTime && firstEndTime <= secondEndTime;
    let cond4 =
      firstStartTime <= secondStartTime && secondEndTime <= firstEndTime;
    return cond1 || cond2 || cond3 || cond4;
  },

  isWeekend: (startTimeStr, endTimeStr) => {
    let start = new Date(startTimeStr);
    let startDay = start.getDay();
    let end = new Date(endTimeStr);
    let endDay = end.getDay();
    const millisecondsInDay = 86400000;
    const millisecondsInWeek = 604800000;
    if (startDay === 0 || endDay === 0) {
      return true;
    } else if (startDay === 6 || endDay === 6) {
      return true;
    } else if (startDay > endDay) {
      return true;
    } else if (
      startDay < endDay &&
      Date.parse(endTimeStr) - Date.parse(startTimeStr) >= millisecondsInWeek
    ) {
      return true;
    } else if (
      startDay === endDay &&
      Date.parse(endTimeStr) - Date.parse(startTimeStr) >= millisecondsInDay
    ) {
      return true;
    }
    return false;
  }
};
