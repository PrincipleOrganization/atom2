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
    const faviconPath = path.join(global.__dirname__, 'public/favicon.ico');

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
          title: 'Atom',
          favicon: faviconPath
        },
        header: {
          title: 'Atom',
          image: faviconPath
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
