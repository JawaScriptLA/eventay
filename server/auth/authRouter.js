const express = require("express");
const authRouter = express.Router();
const db = require('../db/db.js');

module.exports = passportObj => {
  authRouter.post("/signup", (req, res, next) => {
    passportObj.authenticate("signup", async (err, user, info) => {
      if (err) {
        return res.status(401).end();
      }
      
      const { username } = req.body;
      try {
        const query = `
          INSERT INTO users (username, likes_count)
          VALUES ('${username}', DEFAULT)
          RETURNING username
        `;
        const data = await db.queryAsync(query);
      } catch (err) {
        console.log(`Error during signup: ${err}`);
      }

      req.login(user, err => {
        if (err) {
          return res.status(401).end();
        } else {
          return res.send(info);
        }
      });
    })(req, res, next);
  });

  authRouter.post("/login", (req, res, next) => {
    passportObj.authenticate("login", (err, user, info) => {
      if (err) {
        return res.status(401).end();
      }
      if (!user) {
        return res.status(401).end();
      }
      req.logIn(user, err => {
        if (err) {
          return res.status(401).end();
        }
        res.send(info);
      });
    })(req, res, next);
  });

  authRouter.post("/logout", (req, res, next) => {
    delete req.decoded;
    req.logout();
    res.json("User successfully logged out");
  });
  return authRouter;
};
