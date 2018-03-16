var LocalStrategy = require("passport-local").Strategy;
var User = require("./models/user.js");
var bCrypt = require("bcryptjs");

module.exports = passport => {
  passport.use(
    "signup",
    new LocalStrategy(
      {
        passReqToCallback: true
      },
      (req, username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
          if (err) {
            console.log("Error in SignUp: " + err);
            return done(err);
          }
          // User already exists
          if (user) {
            console.log("User already exists with username: " + username);
            return done(
              null,
              false
              // req.flash("message", "User Already Exists")
            );
          } else {
            // Create new user
            var newUser = new User();
            newUser.username = username;
            newUser.password = createHash(password);

            // Save the user
            newUser.save(err => {
              if (err) {
                console.log("Error in Saving user:", err);
                throw err;
              }
              console.log("User Registration succesful");
              return done(null, newUser);
            });
          }
        });
      }
    )
  );

  // Generates hash using bCrypt
  var createHash = password => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  };
};
