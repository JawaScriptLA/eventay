const router = require("express").Router();
const { signup, login } = require("./components/auth/authController");
const {
  sendRequest,
  pendingRequests,
  acceptRequest,
  declineRequest
} = require("./components/friendReq/friendReqController");
const {
  createEvent,
  seeUserEvents
} = require("./components/event/eventController");
const authRouter = require("./auth/authRouter.js");
const checkAuth = require("./auth/check-auth.js");


module.exports = passportObj => {
  router.use("/auth", authRouter(passportObj));
  router.use("/", checkAuth);

  router.all("/test", (req, res) => res.send({ message: "test" }));

  router.use('/auth/signup', signup);
  router.use('/auth/login', login);
  router.post('/friendReq', sendRequest);
  router.get('/friendReq/:user_id', pendingRequests);
  router.put('/friendReq', acceptRequest);
  router.delete('/friendReq', declineRequest);
  router.post('/event', createEvent);
  router.get('/event/:user_id', seeUserEvents);
// router.post('/event/invite/:eventId/:targetId');

  return router;
};

// module.exports = router;
