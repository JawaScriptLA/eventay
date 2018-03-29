const router = require('express').Router();
const controller = require('./eventsController.js');

router.get('/:user_id', async (req, res) => {
  try {
    let data = await controller.getHostingEvents(req.params);
    res.send(data);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get('/eventinfo/:event_id', async (req, res) => {
  try {
    console.log(req.params);
    let data = await controller.getEventDetails(req.params);
    res.send(data);
  } catch (err) {
    res.sendStatus(500);
  }
})

router
  .route('/')
  .post(async (req, res) => {
    try {
      let eventId = await controller.createEvent(req.body);
      res.json(eventId).sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  })
  .put(async (req, res) => {
    try {
      await controller.updateEvent(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  })
  .delete(async (req, res) => {
    try {
      await controller.removeEvent(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  });

module.exports = router;
