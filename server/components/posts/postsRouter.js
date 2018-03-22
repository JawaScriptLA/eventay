const router = require('express').Router();
const controller = require('./postsController.js');

router.route('/')
  .post((req, res) => {
    try {
      await controller.createPost(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  })
  .get('/:event_id', (req, res) => {
    try {
      let data = await controller.getEventPosts(req.query);
      res.send(data);
    } catch (err) {
      res.sendStatus(500);
    }
  })
  .put((req, res) => {
    try {
      await controller.updatePost(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  })
  .delete((req, res) => {
    try {
      await controller.removePost(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  });

module.exports = router;
