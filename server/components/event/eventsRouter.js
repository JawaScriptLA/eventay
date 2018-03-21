const router = require('express').Router();
const controller = require('./eventsController.js');

router.route('/')
  .post((req, res) => {
    try {
      await controller.createEvent(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  })
  .get((req, res) => {
    try {
      let data = await controller.seeHostingEvents(req.body);
      res.send(data);
    } catch (err) {
      res.sendStatus(500);
    }
  })
  .put((req, res) => {
    try {
      await controller.changeEventData(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  })
  .delete((req, res) => {
    try {
      await controller.removeEvent(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  });

module.exports = router;
