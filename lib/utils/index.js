'use strict';

/**
* Module dependencies.
**/

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const constants = require('../constants');

/**
* Module body.
**/

const createFolderIfNotExist = (foldername) => {
  if (!fs.existsSync(foldername)) {
    fs.mkdirSync(foldername);
  }
}

const createFileIfNotExist = (filename, content) => {
  if (!fs.existsSync(filename)) {
    fs.writeFileSync(filename, content);
  }
}

const encrypt = (text) => {
  var cipher = crypto.createCipher(constants.CRYPTO_ALGORITM, constants.CRYPTO_PASSWORD);
  var crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

const decrypt = (text) => {
  var decipher = crypto.createDecipher(constants.CRYPTO_ALGORITM, constants.CRYPTO_PASSWORD);
  var dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

/**
* Export.
**/

module.exports = {
  createFolderIfNotExist: createFolderIfNotExist,
  createFileIfNotExist: createFileIfNotExist,
  encrypt: encrypt,
  decrypt: decrypt
};
