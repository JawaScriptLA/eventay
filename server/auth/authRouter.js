const authRouter = require("express").Router();
const passportObj = require("../index.js");

authRouter.get("/signup", (req, res) => {
  res.send("render signup page");
});

authRouter.get("/login", (req, res) => {
  res.send("render login page");
});

authRouter.post("/signup", (req, res) => {
  res.send("trying to sign up!");
});

authRouter.post("/login", (req, res) => {
  res.send("trying to login!");
});

module.exports = authRouter;
