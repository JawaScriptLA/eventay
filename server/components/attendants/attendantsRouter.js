const router = require('express').Router();
const controller = require('./attendantsController.js');

router.get('/:event_id', async (req, res) => {
  try {
    let data = controller.getEventAttendants(req.params);
    res.send(data);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.route('/')
  .post(async (req, res) => {
    try {
      await controller.addAttendant(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  })
  .put(async (req, res) => {
    try {
      await controller.updateAttendant(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  })
  .delete(async (req, res) => {
    try {
      await controller.removeAttendant(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  });

module.exports = router;
