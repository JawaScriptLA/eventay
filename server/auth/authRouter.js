const express = require("express");
const authRouter = express.Router();
var path = require("path");

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};

module.exports = passportObj => {
  authRouter.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname + "../../../client/public/signup.html"));
  });

  authRouter.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname + "../../../client/public/index.html"));
  });

  authRouter.post(
    "/signup",
    passportObj.authenticate("signup", {
      successRedirect: "/auth/home",
      failureRedirect: "/auth/signup",
      successFlash: "Correct!"
    })
  );

  authRouter.post(
    "/login",
    passportObj.authenticate("login", {
      successRedirect: "/auth/home",
      failureRedirect: "/",
      failureFlash: "WRONG.",
      successFlash: "Correct!"
    })
  );

  authRouter.get("/home", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname + "../../../client/public/home.html"));
  });
  return authRouter;
};
