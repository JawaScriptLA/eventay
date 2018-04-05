const utils = require('../utils/utils.js');

describe('Utility functions', () => {
  test('convertTime properly converts date string to am/pm format', () => {
    expect(utils.convertTime('2018-04-09 12:38:02')).toBe(
      'Mon Apr 09, 2018 12:38 pm'
    );
    expect(utils.convertTime('2018-04-09 00:00:00')).toBe(
      'Mon Apr 09, 2018 12:00 am'
    );
  });

  test('conflictExists properly determines whether two time ranges conflict', () => {
    let time1 = [
      Date.parse('2018-04-01 00:00:00'),
      Date.parse('2018-04-05 00:00:00')
    ];
    let time2 = [
      Date.parse('2018-04-04 00:00:00'),
      Date.parse('2018-04-06 00:00:00')
    ];
    let time3 = [
      Date.parse('2018-04-06 00:00:00'),
      Date.parse('2018-04-10 00:00:00')
    ];
    expect(utils.conflictExists(time1[0], time1[1], time2[0], time2[1])).toBe(
      true
    );
    expect(utils.conflictExists(time1[0], time1[1], time3[0], time3[1])).toBe(
      false
    );
    expect(utils.conflictExists(time2[0], time2[1], time3[0], time3[1])).toBe(
      false
    );
  });

  test('includesWeekend properly determines whether given time range conflicts with the weekend', () => {
    let time1 = [
      Date.parse('2018-04-01 00:00:00'),
      Date.parse('2018-04-05 00:00:00')
    ];
    let time2 = [
      Date.parse('2018-04-04 00:00:00'),
      Date.parse('2018-04-06 00:00:00')
    ];
    expect(utils.includesWeekend(time1[0], time1[1])).toBe(true);
    expect(utils.includesWeekend(time2[0], time2[1])).toBe(false);
  });

  test('isOvernight properly determines whether given time range conflicts with overnight times (11p-6a)', () => {
    let time1 = [
      Date.parse('2018-04-01 16:00:00'),
      Date.parse('2018-04-02 00:00:00')
    ];
    let time2 = [
      Date.parse('2018-04-01 09:00:00'),
      Date.parse('2018-04-01 15:00:00')
    ];
    expect(utils.isOvernight(time1[0], time1[1])).toBe(true);
    expect(utils.isOvernight(time2[0], time2[1])).toBe(false);
  });

  test('isDuringWorkday properly determines whether given time range overlaps with weekday hours', () => {
    let time1 = [
      Date.parse('2018-04-01 00:00:00'),
      Date.parse('2018-04-01 09:00:00')
    ];
    let time2 = [
      Date.parse('2018-04-01 08:00:00'),
      Date.parse('2018-04-01 14:00:00')
    ];
    let time3 = [
      Date.parse('2018-04-01 17:00:00'),
      Date.parse('2018-04-02 08:00:00')
    ];
    expect(utils.isDuringWorkday(time1[0], time1[1])).toBe(false);
    expect(utils.isDuringWorkday(time2[0], time2[1])).toBe(true);
    expect(utils.isDuringWorkday(time3[0], time3[1])).toBe(false);
  });

  test('millisecondsUntilMidnight correctly returns number of milliseconds until midnight', () => {
    let date1 = new Date('2018-04-01 16:30:00');
    let date2 = new Date('2018-04-01 23:25:00');
    expect(utils.millisecondsUntilMidnight(date1)).toBe(27000000);
    expect(utils.millisecondsUntilMidnight(date2)).toBe(2100000);
  });
});
