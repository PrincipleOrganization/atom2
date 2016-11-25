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

const filename = './data/settings.json';

const STANDART_SETTINGS = {
  logs: {storeLogs: false}
};

let currentSettings = STANDART_SETTINGS;

const init = () => {
  utils.createFolderIfNotExist('./data');
  utils.createFileIfNotExist(filename, JSON.stringify(STANDART_SETTINGS));

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
    settings = JSON.parse(settings);
    return settings;
  } catch (err) {
    logger.info(err);
    return STANDART_SETTINGS; // fallback
  }
}

const setSettings = (settings, callback) => {
  let success = true;

  fs.writeFile(filename, JSON.stringify(settings), (err) => {
    if (err) {
      logger.err(err);
      callback(false);
    } else {
      currentSettings = settings;
      callback(true);
    }
  });
}

const setSettingsSync = (settings) => {
  try {
    fs.writeFileSync(filename, JSON.stringify(settings));
    currentSettings = settings;
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
