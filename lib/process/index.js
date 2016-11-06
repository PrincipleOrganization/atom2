'use strict';

/**
* Module dependencies.
**/

const spawn = require('child_process').spawn;
const spawnSync = require('child_process').spawnSync;

/**
* Module body.
**/

const startApplication = () => {
  const app = spawn('node', ['app.js']);

  app.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  app.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  app.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

  return app;
}

const updateApplication = (app) => {
  const npm = spawnSync('npm', ['install', '--production']);

  console.log(`NPM exited with status:`, npm.status);

  app.kill();
}

exports.startApplication = startApplication;
exports.updateApplication = updateApplication;
