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

  includesWeekend: (startTimeStr, endTimeStr) => {
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
  },

  isOvernight: (startTimeStr, endTimeStr) => {
    let start = new Date(startTimeStr);
    let startHour = start.getHours();
    let end = new Date(endTimeStr);
    let endHour = end.getHours();
    if (startHour === 23 || startHour < 6) {
      return true;
    } else if (
      (endHour === 23 && end.getMinutes() > 0) ||
      endHour < 6 ||
      (endHour === 6 && end.getMinutes() === 0)
    ) {
      return true;
    } else if (start.toDateString() !== end.toDateString()) {
      return true;
    }
    return false;
  },

  isDuringWorkday: (startTimeStr, endTimeStr) => {
    let start = new Date(startTimeStr);
    let startHour = start.getHours();
    let end = new Date(endTimeStr);
    let endHour = end.getHours();

    if (start.toDateString() === end.toDateString() && startHour < 9) {
      if (endHour < 9) {
        return false;
      } else if (endHour === 9 && start.getMinutes() === 0) {
        return false;
      }
    } else if (start.toDateString() === end.toDateString() && startHour >= 16) {
      return false;
    } else if (start.toDateString() !== end.toDateString()) {
      let millsTilMidnight = module.exports.millisecondsUntilMidnight(start);
      const nineHrsToMilliseconds = 32400000;
      let startEndDiff = end.getTime() - start.getTime();
      if (millsTilMidnight + nineHrsToMilliseconds >= startEndDiff) {
        return false;
      }
    }
    return true;
  },

  millisecondsUntilMidnight: date => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newMinutes = (60 - minutes) % 60;
    let newHours = (24 - hours) % 24;
    if (minutes !== 0) {
      newHours--;
    }
    return newMinutes * 60000 + newHours * 3600000;
  }
};
