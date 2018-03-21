const router = require("express").Router();

const authRouter = require("./auth/authRouter.js");
const checkAuth = require("./auth/check-auth.js");

const {
  sendRequest,
  pendingRequests,
  acceptRequest,
  declineRequest,
  seeMyFriends,
} = require('./components/friendReq/friendReqController');
const {
  createEvent,
  seeHostingEvents,
} = require('./components/event/eventController');
const {
  inviteTargetToEvent,
  seeAllEventAttendants,
  respondToEventInvite,
  attendantSeeTheirInvites,
} = require('./components/attendants/attendantsController');
const {
  createPost,
  editPost,
  deletePost
} = require('./components/posts/postsController');
const { select } = require('./queries/select.js');

module.exports = passportObj => {
  router.use("/auth", authRouter(passportObj));
  router.use("/", checkAuth);
  router.all('/test', (req, res) => res.send({ message: 'test' }));

  router.post('/friendReq', sendRequest);
  router.get('/friendReq/:user_id', pendingRequests);
  router.put('/friendReq', acceptRequest);
  router.delete('/friendReq', declineRequest);
  router.get('/friends/:user_id', seeMyFriends);
  router.post('/event', createEvent);
  router.get('/event/:user_id', seeHostingEvents);
  router.post('/event/invite', inviteTargetToEvent);
  router.get('/event/invite/:event_id', seeAllEventAttendants);
  router.put('/event/invite', respondToEventInvite);
  router.get('/event/invitations/:user_id', attendantSeeTheirInvites);
  router.post('/event/post', createPost);
  router.put('/event/post', editPost);
  router.delete('/event/post', deletePost);
  router.get('/select/:table_name', async (req, res) => {
  res.send(await select(req.params.table_name));
  });
  return router;
};
