import express from 'express';
import authRouter from './components/auth/authRouter';
import { pendingRequests, sendRequest, acceptRequest, declineRequest } from './components/friendReq/friendReqController';

const router = express.Router();

router.use('api/auth', authRouter);
router.get('api/friendReq/:id', pendingRequests);
router.post('api/friendReq', sendRequest);
router.put('api/friendReq', acceptRequest);
router.delete('api/friendReq', declineRequest);

// router.get('api/event/:id');
// router.post('api/event');
// router.post('api/event/invite');
// router.get('api/user/:id');

module.exports = router;
