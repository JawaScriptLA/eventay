const router = require('express').Router();
const controller = require('./usersController.js');

router.get('/:username', async (req, res) => {
  try {
    let data = await controller.getUserInfo(req.params);
    res.send(data);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.route('/')
  .put((req, res) => {
    try {
      await controller.updateUser(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  });

module.exports = router;
