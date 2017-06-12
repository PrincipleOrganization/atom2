'use strict';

/**
* Module dependencies.
**/

const path = require('path');
const express = require('express');
const router = express.Router();

/**
* Module body.
**/

router.get('/',  (req, res) => {
  var appDir = path.dirname(require.main.filename);
  res.sendFile(path.join(appDir, 'client/dist/index.html'));
});

/**
* Export.
**/

module.exports = router;
