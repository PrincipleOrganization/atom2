'use strict';

/**
* Module dependencies.
**/

const winston = require('winston');
const utils = require('../utils');

/**
* Module body.
**/

const MAXSIZE = 524288000; // 500 MB

const LOG_TYPE_INFO = 'info';
const LOG_TYPE_ERR = 'error';

winston.emitErrs = true;

utils.createFolderIfNotExist('./data');

const { File, Console } = winston.transports;

const logger = new winston.Logger({
  transports: [
    new File({
      level: 'info',
      name: 'dhfkdhkj',
      filename: './data/logs.log',
      handleExceptions: true,
      json: true,
      maxsize: MAXSIZE,
      maxFiles: 1,
      colorize: false
    }),
    new Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});

const log = (type, msg) => {
  const settings = require('../data/settings').getSettingsSync();
  if (settings.logs.storeLogs) {
    logger[type](msg);
  }
}

const stream = {
  write: (msg) => {log(LOG_TYPE_INFO, msg)}
}

/**
* Export.
**/

module.exports = {
  stream: stream,
  info: (msg) => {log(LOG_TYPE_INFO, msg)},
  err: (msg) => {log(LOG_TYPE_ERR, msg)}
};
