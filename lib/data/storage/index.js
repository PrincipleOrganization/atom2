'use strict';

/**
* Module dependencies.
**/

const fs = require('fs');
const path = require('path');
const utils = require('../../utils');
const logger = require('../../logger');

/**
* Module body.
**/

const filePath = './data/storage.json';

// *** Main functions

const init = function() {
  let obj = {flows: []};

  utils.createFolderIfNotExist('./data');
  utils.createFileIfNotExist(filePath, JSON.stringify(obj));

  let storage = getStorage();
  if (!storage.flows) {
    fs.writeFileSync(filePath, JSON.stringify(obj));
  }
}

const getFlows = function() {
  let storage = getStorage();
  return storage.flows;
}

const addFlow = function(flow) {
  let success = true;

  try {
    let storage = getStorage();

    flow._id = newId(storage.flows);
    storage.flows.push(flow);

    updateStorageFile(storage);
  } catch (err) {
    logger.err(err);
    success = false;
  }

  return success;
}

const removeFlow = function(id) {
  let storage = getStorage();
  for (let i in storage.flows) {
    if (storage.flows[i]._id === id) {
      storage.flows.splice(i, 1);
    }
  }
  updateStorageFile(storage);

  return true;
}

const updateFlow = function(device) {
  let success = true;

  try {
    let storage = getStorage();
    for (let i in storage.flows) {
      if (storage.flows[i]._id === device._id) {
        storage.flows[i] = device;
      }
    }
    updateStorageFile(storage);
  } catch (err) {
    logger.err(err);
    success = false;
  }

  return success;
}

// *** Helpers

const updateStorageFile = function(storage) {
  s.writeFileSync(filePath, JSON.stringify(storage));
}

const getStorage = function() {
  let storage = fs.readFileSync(filePath);
  storage = JSON.parse(storage.toString());
  return storage;
}

const newId = function(array) {
  let maxId = 0;
  for (let i in array) {
    if (array[i]._id > maxId) {
      maxId = array[i]._id;
    }
  }
  return maxId + 1;
}

/**
* Export.
**/

module.exports = {
  init: init,
  getFlows: getFlows,
  addFlow: addFlow,
  removeFlow: removeFlow,
  updateFlow: updateFlow
};
