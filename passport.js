const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("./key");

const User = require("./models/User");
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (profile, done) => {
      // Check if google profile exist.
      if (profile.id) {
        User.findOne({ googleId: profile.id }).then((existingUser) => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            new User({
              googleId: profile.id,
              email: profile.emails[0].value,
              username: profile.name.familyName + " " + profile.name.givenName,
              avatar: profile.picture,
            })
              .save()
              .then((user) => done(null, user));
          }
        });
      }
    }
  )
);
