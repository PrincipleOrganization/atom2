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
    this.server = new Server();
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
