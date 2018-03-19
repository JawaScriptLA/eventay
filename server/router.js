const router = require("express").Router();

const authRouter = require("./auth/authRouter.js");
const checkAuth = require("./auth/check-auth.js");

const { signup, login } = require("./components/auth/authController");
const {
  sendRequest,
  pendingRequests,
  acceptRequest,
  declineRequest,
} = require('./components/friendReq/friendReqController');
const {
  createEvent,
  seeUserEvents,
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

module.exports = passportObj => {
  router.use("/auth", authRouter(passportObj));
  router.use("/", checkAuth);
  router.all('/test', (req, res) => res.send({ message: 'test' }));

  router.use('/auth/signup', signup);
  router.use('/auth/login', login);
  router.post('/friendReq', sendRequest);
  router.get('/friendReq/:user_id', pendingRequests);
  router.put('/friendReq', acceptRequest);
  router.delete('/friendReq', declineRequest);
  router.post('/event', createEvent);
  router.get('/event/:user_id', seeUserEvents);
  router.post('/event/invite', inviteTargetToEvent);
  router.get('/event/invite/:event_id', seeAllEventAttendants);
  router.put('/event/invite', respondToEventInvite);
  router.get('/event/invitations/:user_id', attendantSeeTheirInvites);
  router.post('/event/post', createPost);
  router.put('/event/post', editPost);
  router.delete('/event/post', deletePost);
  
  return router;
};

// module.exports = router;
