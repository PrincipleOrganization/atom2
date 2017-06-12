'use strict';

/**
* Module dependencies.
**/

const fs = require('fs');
const utils = require('../../utils');
const logger = require('../../logger');

/**
* Module body.
**/

const filename = './data/settings.st';

const STANDART_SETTINGS = {
  logs: {storeLogs: false},
  auth: {
    username: 'user',
    password: 'password',
    jwtSecret: 'HweJUl8932cnFdj242376dcvnkj214872csjx5'
  }
};

let currentSettings = STANDART_SETTINGS;

const init = () => {
  utils.createFolderIfNotExist('./data');
  utils.createFileIfNotExist(filename, utils.encrypt(JSON.stringify(STANDART_SETTINGS)));

  currentSettings = getSettingsFromFileSync();
  if (!currentSettings) {
    setSettingsSync(STANDART_SETTINGS);
  }
}

const getSettings = (callback) => {
  callback(currentSettings);
}

const getSettingsSync = () => {
  return currentSettings;
}

const getSettingsFromFileSync = () => {
  try {
    let settings = fs.readFileSync(filename);
    settings = utils.decrypt(settings.toString());
    settings = JSON.parse(settings);
    return settings;
  } catch (err) {
    logger.info(err);
    return STANDART_SETTINGS; // fallback
  }
}

const setSettings = (settings, callback) => {
  let success = true;

  let _settings = settings;
  _settings.auth.jwtSecret = getSettingsSync().auth.jwtSecret;
  let _settingsString = JSON.stringify(_settings);

  fs.writeFile(filename, utils.encrypt(_settingsString), (err) => {
    if (err) {
      logger.err(err);
      callback(false);
    } else {
      currentSettings = _settings;
      callback(true);
    }
  });
}

const setSettingsSync = (settings) => {
  try {
    let _settings = settings;
    _settings.auth.jwtSecret = getSettingsSync().auth.jwtSecret;
    let _settingsString = JSON.stringify(_settings);

    fs.writeFileSync(filename, utils.encrypt(_settingsString));
    currentSettings = _settings;
  } catch (err) {
    logger.err(err);
  }
}

/**
* Export.
**/

module.exports = {
  init: init,
  getSettings: getSettings,
  getSettingsSync: getSettingsSync,
  setSettings: setSettings,
  setSettingsSync: setSettingsSync
};
