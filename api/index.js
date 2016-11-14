'use strict';

const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
    api: 2
  });
});

module.exports = router;
