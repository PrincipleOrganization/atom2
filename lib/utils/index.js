'use strict';

/**
* Module dependencies.
**/

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const CRYPTO_ALGORITM = 'aes-256-ctr';
const CRYPTO_PASSWORD = '1vhdfb437239NDosDOLLn0124vja';

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
  var cipher = crypto.createCipher(CRYPTO_ALGORITM, CRYPTO_PASSWORD);
  var crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

const decrypt = (text) => {
  var decipher = crypto.createDecipher(CRYPTO_ALGORITM, CRYPTO_PASSWORD);
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
