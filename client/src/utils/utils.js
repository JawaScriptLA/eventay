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
  }
};
