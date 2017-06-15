'use strict';

/**
* Module dependencies.
**/

const jwt = require('jsonwebtoken');

/**
 *  The Auth Checker middleware function.
 */

module.exports = (req, res, next) => {
  const parsedURL = req.url.split('/');
  if (parsedURL[1] === 'platform' && parsedURL[2] !== 'ui') {
    next();
  } else {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).redirect('/ui').end();
    }

    const settings = require('../../data/settings').getSettingsSync();

    // decode the token using a secret key-phrase
    return jwt.verify(token, settings.auth.jwtSecret, (err, decoded) => {
      // the 401 code is for unauthorized status
      if (err) { return res.status(401).end(); }

      const username = decoded.sub;

      if (username === settings.auth.support.username
        || ((username === settings.auth.admin.username || username === settings.auth.user.username) && parsedURL[1] !== 'editor')) {
        return next();
      } else {
        return res.status(401).redirect('/ui').end();
      }
    });
  }
};
