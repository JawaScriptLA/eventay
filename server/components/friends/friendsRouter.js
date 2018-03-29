const router = require('express').Router();
const controller = require('./friendsController.js');

router.get('/:user_id', async (req, res) => {
  try {
    let data = await controller.getPendingFriends(req.params);
    res.send(data);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get('/check/:user_id/:target_id', async (req, res) => {
  try {
    let data = await controller.checkFriendStatus(req.params);
    res.send(data);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.route('/')
  .post(async (req, res) => {
    try {
      await controller.addFriend(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  })
  .put(async (req, res) => {
    try {
      await controller.updateFriend(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  })
  .delete(async (req, res) => {
    try {
      await controller.removeFriend(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  });

module.exports = router;
