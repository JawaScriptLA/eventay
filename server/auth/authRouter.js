const express = require("express");
const authRouter = express.Router();
var path = require("path");

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

module.exports = passportObj => {
  // authRouter.get("/signup", (req, res) => {
  //   res.sendFile(path.join(__dirname + "../../../client/public/signup.html"));
  // });

  // authRouter.get("/login", (req, res) => {
  //   res.send("in the login route!");
  //   // res.sendFile(path.join(__dirname + "../../../client/public/index.html"));
  // });

  authRouter.post("/signup", (req, res, next) => {
    passportObj.authenticate("signup", (err, user, info) => {
      if (err) {
        return res.send("error1");
      }
      req.login(user, err => {
        if (err) {
          return res.send("error2");
          // return next(err);
        }
        return res.send("success");
      });
    })(req, res, next);
  });

  authRouter.post("/login", (req, res, next) => {
    console.log("in my routerrere", req.body);
    passportObj.authenticate("login", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.send("back to login page");
        return;
      }
      req.logIn(user, err => {
        if (err) {
          return next(err);
        }
        res.send("success");
        return;
      });
    })(req, res, next);
  });

  // authRouter.get("/home", isAuthenticated, (req, res) => {

  // });
  return authRouter;
};
