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

    const defaultSupportUsername = settings.auth.support.username;
    const defaultSupportPassword = settings.auth.support.password;
    const defaultAdminUsername = settings.auth.admin.username;
    const defaultAdminPassword = settings.auth.admin.password;
    const defaultUserUsername = settings.auth.user.username;
    const defaultUserPassword = settings.auth.user.password;
    const jwtSecret = settings.auth.jwtSecret;

    if (username !== defaultSupportUsername && username !== defaultAdminUsername && username !== defaultUserUsername) {
      return done(generateError('Incorrect username'));
    }

    if (password !== defaultSupportPassword && password !== defaultAdminPassword && password !== defaultUserPassword) {
      return done(generateError('Incorrect password'));
    }

    const isSupport = (username === defaultSupportUsername && password === defaultSupportPassword);
    const isAdmin = (username === defaultAdminUsername && password === defaultAdminPassword);
    const isUser = (username === defaultUserUsername && password === defaultUserPassword);
    if (isSupport || isAdmin || isUser) {
      const payload = {
        sub: username
      };

      const token = jwt.sign(payload, jwtSecret);
      const data = {
        name: username,
        role: (isSupport) ? 'support' : ((isAdmin) ? 'admin' : 'user')
      };

      return done(null, token, data);
    } else {
      return done(generateError('Incorrect credentials'));
    }
  }
);
