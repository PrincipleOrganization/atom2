'use strict';

const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
    api: 1
  });
});

module.exports = router;
