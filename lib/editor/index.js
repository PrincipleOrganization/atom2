'use strict';

/**
* Module dependencies.
**/

const path = require('path');

/**
* Module body.
**/

class Editor {
  constructor() {
    this.settings = {
      httpAdminRoot: '/editor',
      httpNodeRoot: '/api',
      // adminAuth: {
      //   type: "credentials",
      //   sessionExpiryTime: 86400,
      //   users: [{
      //     username: "admin",
      //     password: "princip",
      //     permissions: "*"
      //   }]
      // },
      editorTheme: {
        page: {
          title: 'Atom'
        },
        header: {
          title: 'Atom'
        }
      },
      flowFile: path.join(path.dirname(require.main.filename), 'flows.json'), // joinpath to main dir and file.
      functionGlobalContext: { }    // enables global context.
    };

    this.nodeRed = require('node-red');
  }

  // Initialize NodeRed.
  initialize(server) {
    this.nodeRed.init(server, this.settings);
  }

  // Start NodeRed.
  start() {
    this.nodeRed.start();
  }
}

/**
* Export.
**/

module.exports = new Editor();
