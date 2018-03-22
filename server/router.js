const router = require('express').Router();
const authRouter = require('./auth/authRouter.js');
const checkAuth = require('./auth/check-auth.js');

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
const { select } = require('./queries/select.js');

module.exports = passportObj => {
  router.use('/auth', authRouter(passportObj));
  router.use('/', checkAuth);
  router.all('/test', (req, res) => {
    res.send({ message: 'test' });
  });

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
    console.log('hours:', durationHrs);
    console.log('minutes:', durationMins);
    console.log('time ranges:', possibleTimes);
    console.log('schedules:', schedules);
    const durationAsMilliseconds = (durationHrs * 60 + durationMins) * 60000;
    const halfHourAsMilliseconds = 1800000;
    const availableTimes = [];
    for (timeRange of possibleTimes) {
      const currRangeEnd = Date.parse(timeRange[1]);
      let currStart = Date.parse(timeRange[0]);
      let currEnd = currStart + durationAsMilliseconds;
      while (currEnd <= currRangeEnd) {
        availableTimes.push([
          new Date(currStart).toLocaleString(),
          new Date(currEnd).toLocaleString()
        ]);
        currStart += halfHourAsMilliseconds;
        currEnd += halfHourAsMilliseconds;
      }
    }

    res.json(availableTimes.length);
    // inputs: duration (number), possible time range(s) (array of tuples?), array of each user's events
    // output: array of remaining recommended times
  });

  router.get('/select/:table_name', async (req, res) => {
    res.send(await select(req.params.table_name));
  });
  return router;
};
