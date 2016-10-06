'use strict';

/**
* Module dependencies.
**/

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');

const editor = require('../editor');

/**
* Module body.
**/

class Server {
  constructor(port = '4000') {
    const app = express();

    app.set('env', (process.env.NODE_ENV || 'development'));

    this.port = this.normalizePort(port);
    app.set('port', this.port);

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    // Create a server.
    this.http = http.createServer(app);

    // Setup API.
    const apiV1 = require('../../api');
    const apiVersion = 'v1';

    app.use('/api/v1', apiV1);

    app.get('/api', (req, res) => {
      res.redirect('/api/' + apiVersion);
    });

    editor.initialize(this.http);

    // Serve the editor UI from /editor.
    app.use(editor.settings.httpAdminRoot, editor.nodeRed.httpAdmin);
    // Serve the http nodes UI from /api.
    app.use(editor.settings.httpNodeRoot, editor.nodeRed.httpNode);

    // If routh not find.
    app.get('*', function(req, res){
      res.status(404).send('Not found')
    });

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json(err);
      });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });
  }

  // Start the server and editor.
  start() {
    this.http.listen(this.port);
    this.http.on('error', this.onError.bind(this));
    this.http.on('listening', this.onListening.bind(this));

    editor.start();
  }

  // Normalize a port into a number, string, or false.
  normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  // Event listener for HTTP server "error" event.
  onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
      case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
      default:
      throw error;
    }
  }

  // Event listener for HTTP server "listening" event.
  onListening() {
    const addr = this.http.address();
    const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    console.log('Listening on ' + bind);
  }
}

/**
* Export.
**/

module.exports = Server;
