const express = require("express");
const authRouter = express.Router();

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

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
  return authRouter;
};
