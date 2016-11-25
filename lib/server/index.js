'use strict';

/**
* Module dependencies.
**/

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const https = require('https');
const fs = require('fs');
const logger = require('../logger');

/**
* Module body.
**/

class Server {
  constructor(editor, port) {
    const app = express();

    app.set('env', (process.env.NODE_ENV || 'development'));

    this.port = this.normalizePort(port);
    app.set('port', this.port);

    // uncomment after placing your favicon in /public
    app.use(favicon(path.resolve('./public', 'favicon.ico')));
    app.use(bodyParser.json({limit: '10mb'}));
    app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
    app.use(cookieParser());
    app.use(require('morgan')('combined', {'stream': logger.stream}));

    // Create a server.
    const ssl = {
      key: './data/ssl/key.pem',
      cert: './data/ssl/cert.pem'
    }

    if (fs.existsSync(ssl.key) && fs.existsSync(ssl.cert)) {
      const options = {
        key: fs.readFileSync(ssl.key),
        cert: fs.readFileSync(ssl.cert)
      };
      this.http = https.createServer(options, app);
    } else {
      this.http = http.createServer(app);
    }

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
      logger.err(err);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });
  }

  // Start the server.
  start(callback) {
    this.http.listen(this.port);
    this.http.on('error', this.onError.bind(this));
    this.http.on('listening', this.onListening.bind(this));

    if (callback) {
      callback();
    }
  }

  // Stop the server and editor.
  stop(callback) {
    this.http.close();

    if (callback) {
      callback();
    }
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

    const bind = typeof this.port === 'string'
    ? 'Pipe ' + this.port
    : 'Port ' + this.port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
      logger.err(bind + ' requires elevated privileges');
      process.exit(1);
      break;
      case 'EADDRINUSE':
      logger.err(bind + ' is already in use');
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
    logger.info('Listening on ' + bind);
  }
}

/**
* Export.
**/

module.exports = Server;
