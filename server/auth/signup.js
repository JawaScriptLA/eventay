var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user.js');
var bCrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = passport => {
  passport.use(
    'signup',
    new LocalStrategy(
      { session: false, passReqToCallback: true},
      (req, username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
          if (err) {
            console.log('Error in SignUp: ' + err);
            return done(err);
          }

          // User already exists
          if (user) {
            console.log('User already exists with username: ' + username);
            return done(null, false /*req.flash('message', 'User Already Exists')*/);
          } else {
            // Create new user
            var newUser = new User();
            newUser.username = username;
            newUser.password = createHash(password);

            // Save the user
            newUser.save(err => {
              if (err) {
                console.log('Error in Saving user:', err);
                throw err;
              }

              console.log('User Registration successful');
              const payload = { userId: newUser._id, username: newUser.username };

              // create a token string
              const token = jwt.sign(payload, 'mySecret');
              return done(null, newUser, token);
            });
          }
        });
      }
    )
  );

  // Generates hash using bCrypt
  var createHash = password => bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};
