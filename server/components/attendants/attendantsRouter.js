const router = require('express').Router();
const controller = require('./attendantsController.js');

router.route('/')
  .post(async (req, res) => {
    try {
      await controller.inviteTargetToEvent(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  })
  .get(async (req, res) => {
    try {
      let data = controller.seeAllEventAttendants(req.body);
      res.send(data);
    } catch (err) {
      res.sendStatus(500);
    }
  })
  .put(async (req, res) => {
    try {
      await controller.respondToEventInvite(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  })
  .delete(async (req, res) => {
    try {
      await controller.declineEventInvite(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  });

module.exports = router;
