'use strict';

/**
* Module dependencies.
**/

const fs = require('fs');

const path = './storage.json';

/**
* Module body.
**/

// *** Main functions

const init = function() {
  if (!fs.existsSync(path)) {
    let obj = {devices: []};
    fs.writeFileSync(path, JSON.stringify(obj));
  }
}

const getDevices = function() {
  let storage = getStorage();
  return storage.devices;
}

const addDevice = function(device) {
  let success = true;

  try {
    let storage = getStorage();

    device._id = newId(storage.devices);
    storage.devices.push(device);

    updateStorageFile(storage);
  } catch (err) {
    console.log(err);
    success = false;
  }

  return success;
}

const removeDevice = function(id) {
  let storage = getStorage();
  for (let i in storage.devices) {
    if (storage.devices[i]._id === id) {
      storage.devices.splice(i, 1);
    }
  }
  updateStorageFile(storage);

  return true;
}

const updateDevice = function(device) {
  let success = true;

  try {
    let storage = getStorage();
    for (let i in storage.devices) {
      if (storage.devices[i]._id === device._id) {
        storage.devices[i] = device;
      }
    }
    updateStorageFile(storage);
  } catch (err) {
    console.log(err);
    success = false;
  }

  return success;
}

// *** Helpers

const updateStorageFile = function(storage) {
  fs.writeFileSync(path, JSON.stringify(storage));
}

const getStorage = function() {
  let storage = fs.readFileSync(path);
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
  getDevices: getDevices,
  addDevice: addDevice,
  removeDevice: removeDevice,
  updateDevice: updateDevice
};
