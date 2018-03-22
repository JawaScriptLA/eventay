const router = require('express').Router();
const authRouter = require('./auth/authRouter.js');
const checkAuth = require('./auth/checkAuth.js');
const friendsRouter = require('./components/friends/friendsRouter.js');
const eventsRouter = require('./components/event/eventsRouter.js');
const attendantsRouter = require('./components/attendants/attendantsRouter.js');
const postsRouter = require('./components/posts/postsRouter.js');
const { getAllFriends } = require('./components/friends/friendsController.js');
const { getAllAttending } = require('./components/attendants/attendantsController.js');
const { select } = require('./queries/select.js');

const conflictExists = (
  firstStartTime,
  firstEndTime,
  secondStartTime,
  secondEndTime
) => {
  let cond1 =
    firstStartTime < secondStartTime && secondStartTime < firstEndTime;
  let cond2 =
    secondStartTime < firstStartTime && firstStartTime < secondEndTime;
  let cond3 =
    secondStartTime <= firstStartTime && firstEndTime <= secondEndTime;
  let cond4 =
    firstStartTime <= secondStartTime && secondEndTime <= firstEndTime;
  return cond1 || cond2 || cond3 || cond4;
};
module.exports = passportObj => {
  router.use('/auth', authRouter(passportObj));
  router.use('/', checkAuth);
  router.all('/test', (req, res) => res.send({ message: 'test' }));

  router.use('/post', postsRouter);
  router.use('/friend', friendsRouter);
  router.use('/event', eventsRouter);
  router.use('/attendant', attendantsRouter);
  router.get('/friends/:user_id', async (req, res) => {
    try {
      let data = await getAllFriends(req.query);
      res.send(data);
    } catch (err) {
      res.sendStatus(500);
    }
  });
  router.get('/attendants/:user_id', async (req, res) => {
    try {
      let data = await getAllAttending(req.query);
      res.send(data);
    } catch (err) {
      res.sendStatus(500);
    }
  });
  router.get('/select/:table_name', async (req, res) => res.send(await select(req.params.table_name)));
  
  return router;
};
