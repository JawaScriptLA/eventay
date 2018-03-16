const express = require("express");
const authRouter = express.Router();
var path = require("path");

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
      failureRedirect: "/auth/signup"
    })
  );

  authRouter.post(
    "/login",
    passportObj.authenticate("login", {
      successRedirect: "/auth/home",
      failureRedirect: "/"
    })
  );

  authRouter.get(
    "/home",
    /*isAuthenticated,*/ (req, res) => {
      res.sendFile(path.join(__dirname + "../../../client/public/home.html"));
    }
  );
  return authRouter;
};

// module.exports = authRouter;
