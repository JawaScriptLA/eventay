const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const authRouter = require("./auth/authRouter.js");
const router = require("./router.js");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "/../client/public/")));
// app.use("/api/", router);

app.use(morgan("tiny"));

/* Start auth*/

const passportObj = require("passport");
const expressSession = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(flash());
app.use(
  expressSession({
    secret: "eventay",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passportObj.initialize());
app.use(passportObj.session());
const initPassport = require("./auth/init.js");
initPassport(passportObj);
// app.use("/auth", authRouter(passportObj));
/*End auth*/

app.use("/api", router(passportObj));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "/../client/public/index.html"), function(
    err
  ) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const port = 1337;
app.listen(port, () => {
  console.log("Listening in port", port);
});

module.exports.passportObj = passportObj;
