'use strict';

/**
* Module dependencies.
**/

const Server = require('../server');
const Editor = require('../editor');
const settings = require('../data/settings');
const storage = require('../data/storage');
const templates = require('../data/templates');

/**
* Module body.
**/

settings.init();
storage.init();
templates.init();

const editor = new Editor();
const server = new Server(editor, process.env.ATOM_PORT || '4000');

const application = {
  editor: editor,
  server: server,

  start: (callback) => {
    server.start(() => {
      editor.start(() => {
        if (callback) {
          callback();
        }
      });
    });
  },

  stop: (callback) => {
    server.start(() => {
      editor.start(() => {
        if (callback) {
          callback();
        }
      });
    });
  },

  reloadEditor: (callback) => {
    editor.realodFlows(() => {
      if (callback) {
        callback();
      }
    });
  }
}

/**
* Export.
**/

module.exports = application;
