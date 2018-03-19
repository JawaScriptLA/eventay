const express = require("express");
const authRouter = express.Router();

module.exports = passportObj => {
  authRouter.post("/signup", (req, res, next) => {
    passportObj.authenticate("signup", (err, user, info) => {
      if (err) {
        return res.status(401).end();
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
    // TODO (client side):
    // Delete token (local storage)
    // Redirect to login page
  });
  return authRouter;
};
