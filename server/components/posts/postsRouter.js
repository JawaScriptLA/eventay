const router = require('express').Router();
const controller = require('./postsController.js');

router.get('/:event_id', async (req, res) => {
  try {
    let data = await controller.getEventPosts(req.params);
    res.send(data);
  } catch (err) {
    res.sendStatus(500);
  }
});

router
  .route('/')
  .post(async (req, res) => {
    try {
      const data = await controller.createPost(req.body);
      console.log('DATA: ', data.rows);
      res.send(data.rows);
    } catch (err) {
      console.error('createPost error: ', err.cause);
      res.sendStatus(500);
    }
  })
  .put(async (req, res) => {
    try {
      await controller.updatePost(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  })
  .delete(async (req, res) => {
    try {
      await controller.removePost(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  });

module.exports = router;
