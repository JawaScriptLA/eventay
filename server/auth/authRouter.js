const express = require('express');
const authRouter = express.Router();
const db = require('../db/db.js');

module.exports = passportObj => {
  authRouter.post('/signup', (req, res, next) => {
    passportObj.authenticate('signup', async (err, user, info) => {
      if (err) {
        return res.status(401).end();
      }
      try {
        const { username } = req.body;
        const query = `
          INSERT INTO users (username)
          SELECT '${username}'
          WHERE NOT EXISTS (
            SELECT username FROM users
            WHERE username='${username}'
          )
          RETURNING username
        `;
        console.log(query);
        const data = await db.queryAsync(query);
      } catch (err) {
        console.log(`Error during signup: ${err}`);

        res.sendStatus(401);
      }

      req.login(user, async err => {
        if (err) {
          return res.status(401).end();
        } else {
          const userPayload = {};
          const userRecord = await db.queryAsync(
            `SELECT * FROM users WHERE username='${user.username}'`
          );
          userPayload.userInfo = userRecord.rows[0];
          userPayload.token = info;
          return res.send(userPayload);
        }
      });
    })(req, res, next);
  });

  authRouter.post('/login', (req, res, next) => {
    passportObj.authenticate('login', (err, user, info) => {
      if (err || !user) {
        return res.status(401).end();
      }
      req.logIn(user, async err => {
        console.log('user: ', user);
        const userPayload = {};
        const userRecord = await db.queryAsync(
          `SELECT * FROM users WHERE username='${user.username}'`
        );
        userPayload.userInfo = userRecord.rows[0];
        userPayload.token = info;
        if (err) {
          return res.status(401).end();
        }
        console.log('userPayload: ', userPayload);
        res.send(userPayload);
      });
    })(req, res, next);
  });

  authRouter.post('/logout', (req, res, next) => {
    delete req.decoded;
    req.logout();
    res.json('User successfully logged out');
  });

  return authRouter;
};
