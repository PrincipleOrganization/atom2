const LocalStrategy = require('passport-local').Strategy;

new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',

  },
  (username, password, done) => {
    if (err) throw err;

    if (username !== 'admin') {
      return done(null, 1);
    }

    if (password !== 'admin') {
      return done(null, 2);
    }

    return done(null, 'admin');
  }
);
