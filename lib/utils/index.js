'use strict';

/**
* Module dependencies.
**/

const fs = require('fs');
const path = require('path');

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

/**
* Export.
**/

module.exports = {
  createFolderIfNotExist: createFolderIfNotExist,
  createFileIfNotExist: createFileIfNotExist
};
