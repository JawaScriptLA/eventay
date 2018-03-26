const router = require('express').Router();
const controller = require('./userController.js');

router.get('/:username', async (req, res) => {
  try {
    let data = await controller.getUserProfile(req.params);
    console.log('data', data);
    res.send(data);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.put('/bio', async (req, res) => {
  try {
    const data = await controller.updateUserBio(req.body);
    res.send(data);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.put('/profilepic', async (req, res) => {
  console.log('here')
  try {
    const data = await controller.updateUserPhoto(req.body);
    res.send(data);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;