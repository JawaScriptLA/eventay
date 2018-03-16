const router = require('express').Router();
const {
  sendRequest, acceptRequest, declineRequest,
} = require('./components/friendReq/friendReqController');
// const { createEvent, seeUserEvents } = require('./components/event/eventController');

// router.use('api/auth', authRouter);

// router.get('api/friendReq/:id', pendingRequests);
router.post('api/friendReq', sendRequest);
router.put('api/friendReq', acceptRequest);
router.delete('api/friendReq', declineRequest);

// router.post('api/event', createEvent);
// router.get('api/event/:id', seeUserEvents);
// router.post('api/event/invite/:eventId/:targetId');

// router.get('api/user/:id');

module.exports = router;
