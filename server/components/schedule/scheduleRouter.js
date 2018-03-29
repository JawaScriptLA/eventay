const router = require('express').Router();
const { showUserEvents } = require('../attendants/attendantsController.js');
const { conflictExists } = require('../../../utils/utils.js');

router.post('/showRecommendedTimes', async (req, res) => {
  console.log('req.body is:', req.body);
  const { durationAsMilliseconds, timeRange, selectedFriendIds } = req.body;
  const halfHourAsMilliseconds = 1800000;
  const availableTimes = {};
  let idx = 0;

  let schedules = [];
  for (let i = 0; i < selectedFriendIds.length; i++) {
    schedules.push(await showUserEvents(selectedFriendIds[i]));
  }

  // Generate initial list of possible times
  for (range of timeRange) {
    const currRangeEnd = Date.parse(range[1]);
    let currStart = Date.parse(range[0]);
    let currEnd = currStart + durationAsMilliseconds;

    while (currEnd <= currRangeEnd) {
      availableTimes[idx] = [
        new Date(currStart).toLocaleString(),
        new Date(currEnd).toLocaleString()
      ];
      idx++;
      currStart += halfHourAsMilliseconds;
      currEnd += halfHourAsMilliseconds;
    }
  }
  // Eliminate conflicting times
  for (timeChunk in availableTimes) {
    let firstStartTime = Date.parse(availableTimes[timeChunk][0]);
    let firstEndTime = Date.parse(availableTimes[timeChunk][1]);
    for (schedule of schedules) {
      for (event of schedule) {
        let secondStartTime = Date.parse(event['start_time']);
        let secondEndTime = Date.parse(event['end_time']);
        if (
          conflictExists(
            firstStartTime,
            firstEndTime,
            secondStartTime,
            secondEndTime
          )
        ) {
          delete availableTimes[timeChunk];
        }
      }
    }
  }
  res.json(availableTimes);
});
module.exports = router;
