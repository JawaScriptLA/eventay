const login = require('./login.js');
const signup = require('./signup.js');
const { User } = require('./models/user.js');

module.exports = passportObj => {
  passportObj.serializeUser((user, done) => {
    done(null, user._id);
  });

  passportObj.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  // Passport strategies for login/signup
  login(passportObj);
  signup(passportObj);
};
