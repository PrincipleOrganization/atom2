'use strict';

/**
* Module dependencies.
**/

const Server = require('../server');
const Editor = require('../editor');
const storage = require('../storage');
const templates = require('../templates');

/**
* Module body.
**/

class Application {
  constructor() {
    storage.init();
    templates.init();

    this.editor = new Editor();
    this.server = new Server(this.editor, process.env.ATOM_PORT || '4000');
  }

  // Start the application (launch http server and editor).
  start(callback) {
    this.server.start(() => {
      this.editor.start(() => {
        if (callback) {
          callback();
        }
      });
    });
  }

  // Stop the application (stop http server and editor).
  stop(callback) {
    this.editor.stop(() => {
      this.server.stop(() => {
        if (callback) {
          callback();
        }
      });
    });
  }

  // Reload editor.
  reloadEditor(callback) {
    this.editor.realodFlows(() => {
      if (callback) {
        callback();
      }
    });
  }
}

/**
* Export.
**/

module.exports = Application;
