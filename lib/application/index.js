'use strict';

/**
* Module dependencies.
**/

const Server = require('../server');

/**
* Module body.
**/

class Application {
  constructor() {
    this.server = new Server(process.env.ATOM_PORT || '4000');
  }

  // Start the application (launch http server).
  start() {
    this.server.start();
  }
}

/**
* Export.
**/

module.exports = Application;
