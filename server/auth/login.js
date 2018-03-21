var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user.js');
var bCrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = passport => {
  passport.use(
    'login',
    new LocalStrategy(
      {
        session: false,
        passReqToCallback: true
      },
      (req, username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
          if (err) {
            return done(err);
          }
          // user doesn't exist
          if (!user) {
            // console.log('No user with username: ' + username);
            return done(
              null,
              false /*req.flash('message', 'User Not found.')*/
            );
          }
          // Wrong password
          if (!bCrypt.compareSync(password, user.password)) {
            // console.log('Invalid Password');
            return done(
              null,
              false /*req.flash('message', 'Invalid Password')*/
            );
          }
          // successful login
          // create a token string
          const payload = {
            userId: user._id,
            username: user.username
          };
          const token = jwt.sign(payload, 'mySecret');
          return done(null, user, token);
        });
      }
    )
  );
};
