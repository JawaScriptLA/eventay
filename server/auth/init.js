const login = require("./login.js");
const signup = require("./signup.js");
const User = require("./models/user.js");

module.exports = passportObj => {
  // Passport needs to be able to serialize and deserialize users to support persistent login sessions
  passportObj.serializeUser((user, done) => {
    console.log("serializing user:", user);
    done(null, user._id);
  });

  passportObj.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
      console.log("deserializing user:", user);
      done(err, user);
    });
  });

  // Setting up Passport Strategies for Login and SignUp/Registration
  login(passportObj);
  signup(passportObj);
};
