'use strict';

/**
* Module dependencies.
**/

const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

/**
* Module body.
**/

const generateError = (text) => {
  const error = new Error(text);
  error.name = 'IncorrectCredentialsError';
  return error;
}

/**
* Export.
**/

module.exports = new LocalStrategy(
  (username, password, done) => {
    const settings = require('../data/settings').getSettingsSync();

    const defaultUsername = settings.auth.username;
    const defaultPassword = settings.auth.password;
    const jwtSecret = settings.auth.jwtSecret;

    if (username !== defaultUsername) {
      return done(generateError('Incorrect username'));
    }

    if (password !== defaultPassword) {
      return done(generateError('Incorrect password'));
    }

    const payload = {
      sub: defaultUsername
    };

    const token = jwt.sign(payload, jwtSecret);
    const data = {
      name: defaultUsername
    };

    return done(null, token, data);
  }
);
