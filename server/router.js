const router = require('express').Router();
const authRouter = require('./auth/authRouter.js');
const checkAuth = require('./auth/checkAuth.js');
const friendsRouter = require('./components/friends/friendsRouter.js');
const eventsRouter = require('./components/events/eventsRouter.js');
const attendantsRouter = require('./components/attendants/attendantsRouter.js');
const postsRouter = require('./components/posts/postsRouter.js');
const usersRouter = require('./components/users/usersRouter.js');
const scheduleRouter = require('./components/schedule/scheduleRouter.js');

const { getAllFriends } = require('./components/friends/friendsController.js');
const {
  getAllAttending,
  showUserEvents
} = require('./components/attendants/attendantsController.js');
const { getUserProfile } = require('./components/users/usersController');
const { search } = require('./components/search/searchController.js');
const { select } = require('./queries/select.js');

module.exports = passportObj => {
  router.use('/auth', authRouter(passportObj));
  router.use('/', checkAuth);
  router.all('/test', (req, res) => res.send({ message: 'test' }));
  router.get('/search/:user_id/:query', search);
  router.use('/post', postsRouter);
  router.use('/friend', friendsRouter);
  router.use('/user', usersRouter);
  router.use('/event', eventsRouter);
  router.use('/attendant', attendantsRouter);
  router.use('/schedule', scheduleRouter);
  router.get('/friends/:user_id', async (req, res) => {
    try {
      let data = await getAllFriends(req.params);
      res.send(data);
    } catch (err) {
      res.sendStatus(500);
    }
  });
  router.get('/attendants/:user_id', async (req, res) => {
    try {
      let data = await getAllAttending(req.params);
      res.send(data);
    } catch (err) {
      res.sendStatus(500);
    }
  });
  router.get('/select/:table_name', async (req, res) =>
    res.send(await select(req.params.table_name))
  );
  return router;
};
