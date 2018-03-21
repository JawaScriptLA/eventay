const router = require('express').Router();
const authRouter = require('./auth/authRouter.js');
const checkAuth = require('./auth/checkAuth.js');
const { select } = require('./queries/select.js');
const attendantsRouter = require('./components/attendants/attendantsRouter.js');

const {
  sendRequest,
  pendingRequests,
  acceptRequest,
  declineRequest,
  seeMyFriends
} = require('./components/friendReq/friendReqController');
const {
  createEvent,
  seeHostingEvents,
  seeUserEventsAndInvites
} = require('./components/event/eventController');
const {
  inviteTargetToEvent,
  seeAllEventAttendants,
  respondToEventInvite,
  attendantSeeTheirInvites,
  showUserEvents
} = require('./components/attendants/attendantsController');
const {
  createPost,
  editPost,
  deletePost
} = require('./components/posts/postsController');

const conflictExists = (
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
};
module.exports = passportObj => {
  router.use('/auth', authRouter(passportObj));
  router.use('/', checkAuth);
  router.all('/test', (req, res) => res.send({ message: 'test' }));

  router.use('/attendant', attendantsRouter);
  router.post('/friendReq', sendRequest);
  router.get('/friendReq/:user_id', pendingRequests);
  router.put('/friendReq', acceptRequest);
  router.delete('/friendReq', declineRequest);
  router.get('/friends/:user_id', seeMyFriends);
  router.post('/event', createEvent);
  router.get('/event/:user_id', seeHostingEvents);
  router.get('/event/all/:user_id', seeUserEventsAndInvites);
  router.post('/event/invite', inviteTargetToEvent);
  router.get('/event/invite/:event_id', seeAllEventAttendants);
  router.put('/event/invite', respondToEventInvite);
  router.get('/event/invitations/:user_id', attendantSeeTheirInvites);
  router.post('/event/post', createPost);
  router.put('/event/post', editPost);
  router.delete('/event/post', deletePost);

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

  router.get('/select/:table_name', async (req, res) => {
    res.send(await select(req.params.table_name));
  });
  return router;
};
