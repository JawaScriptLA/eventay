const AuthRouter = require("express").Router();

AuthRouter.get("/signup", (req, res) => {
  res.send("render signup page");
});

AuthRouter.get("/login", (req, res) => {
  res.send("render login page");
});

AuthRouter.post("/signup", (req, res) => {
  res.send("trying to sign up!");
});

AuthRouter.post("/login", (req, res) => {
  res.send("trying to login!");
});

module.exports = AuthRouter;
