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
app.use("/api/", router);

app.use(morgan("tiny"));

app.get("/*", function(req, res) {
  //React routes catch all method source: http://bit.ly/2DqrztT
  res.sendFile(path.join(__dirname, "/../client/public/index.html"), function(
    err
  ) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const port = 1337;
app.use("/", express.static(path.join(__dirname, "/../client/public/")));
app.use(morgan("tiny"));

/* Start auth*/

const passportObj = require("passport");
const expressSession = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
app.use(flash());
app.use(cookieParser());
app.use(expressSession({ secret: "eventay" }));
<<<<<<< HEAD
app.use(passport.initialize());
app.use(passport.session());
<<<<<<< HEAD

<<<<<<< HEAD
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// passport/login.js
passport.use(
  "login",
  new LocalStrategy(
    {
      passReqToCallback: true
    },
    (req, username, password, done) => {
      // check in mongo if a user with username exists or not
      User.findOne({ username: username }, function(err, user) {
        // In case of any error, return using the done method
        if (err) return done(err);
        // Username does not exist; log error & redirect back
        if (!user) {
          console.log("User Not Found with username " + username);
          return done(null, false, req.flash("message", "User Not found."));
        }
        // User exists but wrong password, log the error
        if (!isValidPassword(user, password)) {
          console.log("Invalid Password");
          return done(null, false, req.flash("message", "Invalid Password"));
        }
        // User and password both match, return user from
        // done method which will be treated like success
        return done(null, user);
      });
    }
  )
);

=======
>>>>>>> [ops] Modularized passport code
=======
=======
app.use(passportObj.initialize());
app.use(passportObj.session());
>>>>>>> [ops] pulling from master
const initPassport = require("./auth/init.js");
initPassport(passportObj);
<<<<<<< HEAD
app.use("/auth", authRouter);
>>>>>>> [ops] basic routing for auth router
=======
app.use("/auth", authRouter(passportObj));
<<<<<<< HEAD
>>>>>>> [ops] allow users to create new account and login; connection to db
/*End auth area!*/
=======
/*End auth*/
>>>>>>> [ops] refactors auth code

app.use("/api", router);

const port = 1337;
app.listen(port, () => {
  console.log("Listening in port", port);
});

module.exports.passportObj = passportObj;
