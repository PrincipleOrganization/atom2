'use strict';

/**
* Module dependencies.
**/

const express = require('express');
const router = express.Router();
const templates = require('../lib/templates');
const storage = require('../lib/storage');

/**
* Module body.
**/

router.get('/', (req, res) => {
  res.json({
    api: 2
  });
});

router.get('/reload', (req, res) => {
  global.app.reloadEditor(() => {
    res.json({payload: true});
  });
});

// *** DEVICES

router.get('/devices', (req, res) => {
  res.json({payload: storage.getDevices()});
});

router.post('/device', (req, res) => {
  let device = req.body;
  res.json({payload: storage.addDevice(device)});
});

router.put('/device', (req, res) => {
  let device = req.body;
  res.json({payload: storage.updateDevice(device)});
});

router.delete('/device', (req, res) => {
  let id = req.body.id;
  res.json({payload: storage.removeDevice(id)});
});

// *** TEMPLATES

router.get('/templates', (req, res) => {
  res.json({payload: templates.getTemplates()});
});

router.post('/template', (req, res) => {
  let template = req.body;
  res.json({payload: templates.addTemplate(template)});
});

router.put('/template', (req, res) => {
  let template = req.body;
  res.json({payload: templates.updateTemplate(template)});
});

router.delete('/template', (req, res) => {
  let { id, version } = req.body;
  res.json({payload: templates.removeTemplate(id, version)});
});

router.get('/generate-flow', (req, res) => {
  const { template, flow } = req.query;

  if (template && flow) {
    templates.generate(template, flow, () => {
      res.json({payload: true});
    });
  } else {
    res.json({payload: false});
  }
});

/**
* Export.
**/

module.exports = router;
