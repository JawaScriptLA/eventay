const router = require("express").Router();
const { signup, login } = require("./components/auth/authController");
const {
  sendRequest,
  acceptRequest,
  declineRequest
} = require("./components/friendReq/friendReqController");
const {
  createEvent,
  seeUserEvents
} = require("./components/event/eventController");

router.use("/auth/signup", signup);
router.use("/auth/login", login);

// router.get('/friendReq/:id', pendingRequests);
router.post("/friendReq", sendRequest); // PASSING TESTS
router.put("/friendReq", acceptRequest); // PASSING TESTS
router.delete("/friendReq", declineRequest); // PASSING TESTS
const authRouter = require("./auth/authRouter.js");

module.exports = passportObj => {
  // const { createEvent, seeUserEvents } = require('./components/event/eventController');

  router.use("/auth", authRouter(passportObj));

  // router.get('api/friendReq/:id', pendingRequests);
  router.post("api/friendReq", sendRequest);
  router.put("api/friendReq", acceptRequest);
  router.delete("api/friendReq", declineRequest);
  router.all("/test", (req, res) => res.send({ message: "test" }));

  // router.post('api/event', createEvent);
  // router.get('api/event/:id', seeUserEvents);
  // router.post('api/event/invite/:eventId/:targetId');
  router.post("/event", createEvent);
  router.get("/event/:id", seeUserEvents);
  // router.post('/event/invite/:eventId/:targetId');

  // router.get('/user/:id');
  // router.post('api/event', createEvent);
  // router.get('api/event/:id', seeUserEvents);
  // router.post('api/event/invite/:eventId/:targetId');
  // router.get('api/user/:id');

  return router;
};

// module.exports = router;
