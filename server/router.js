const router = require('express').Router();
const authRouter = require('./auth/authRouter.js');
const checkAuth = require('./auth/checkAuth.js');
const friendsRouter = require('./components/friends/friendsRouter.js');
const eventsRouter = require('./components/events/eventsRouter.js');
const attendantsRouter = require('./components/attendants/attendantsRouter.js');
const postsRouter = require('./components/posts/postsRouter.js');
const { getAllFriends } = require('./components/friends/friendsController.js');
const { getAllAttending, showUserEvents } = require('./components/attendants/attendantsController.js');
const { select } = require('./queries/select.js');

const conflictExists = (firstStartTime, firstEndTime, secondStartTime, secondEndTime) => {
  let cond1 = firstStartTime < secondStartTime && secondStartTime < firstEndTime;
  let cond2 = secondStartTime < firstStartTime && firstStartTime < secondEndTime;
  let cond3 = secondStartTime <= firstStartTime && firstEndTime <= secondEndTime;
  let cond4 = firstStartTime <= secondStartTime && secondEndTime <= firstEndTime;
  return cond1 || cond2 || cond3 || cond4;
};

module.exports = passportObj => {
  router.use('/auth', authRouter(passportObj));
  router.use('/', checkAuth);
  router.all('/test', (req, res) => res.send({ message: 'test' }));

  router.use('/post', postsRouter);
  router.use('/friend', friendsRouter);
  router.use('/event', eventsRouter);
  router.use('/attendant', attendantsRouter);
  router.get('/friends/:user_id', async (req, res) => {
    try {
      let data = await getAllFriends(req.params);
      res.send(data);
    } catch (err) {
      res.sendStatus(500);
    }
  });
  router.get('/attendants/:user_id', async (req, res) => {
    try {
      let data = await getAllAttending(req.params);
      res.send(data);
    } catch (err) {
      res.sendStatus(500);
    }
  });
  router.get('/select/:table_name', async (req, res) => res.send(await select(req.params.table_name)));

  router.get('/schedule/showUserEvents/:user_id', showUserEvents);
  router.post('/schedule/showRecommendedTimes', (req, res) => {
    const { durationHrs, durationMins, possibleTimes, schedules } = req.body;
    const durationAsMilliseconds = (durationHrs * 60 + durationMins) * 60000;
    const halfHourAsMilliseconds = 1800000;
    const availableTimes = {};
    let idx = 0;

    // Generate initial list of possible times
    for (timeRange of possibleTimes) {
      const currRangeEnd = Date.parse(timeRange[1]);
      let currStart = Date.parse(timeRange[0]);
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
      for (schedule of schedules) {
        for (event of schedule) {
          let firstStartTime = Date.parse(availableTimes[timeChunk][0]);
          let firstEndTime = Date.parse(availableTimes[timeChunk][1]);
          let secondStartTime = Date.parse(event[0]);
          let secondEndTime = Date.parse(event[1]);
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
  
  return router;
};
