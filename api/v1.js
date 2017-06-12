'use strict';

/**
* Module dependencies.
**/

const express = require('express');
const router = express.Router();
const templates = require('../lib/data/templates');
const storage = require('../lib/data/storage');
const settings = require('../lib/data/settings');

/**
* Module body.
**/

// *** FUNCTIONS

router.get('/reload', (req, res) => {
  global.app.reloadEditor(() => {
    res.json({payload: true});
  });
});

// *** INFO

router.get('/info', (req, res) => {
  res.json({
    name: 'Atom',
    version: require('../package.json').version
  });
});

// *** SETTINGS

router.get('/settings', (req, res) => {
  settings.getSettings((settings) => {
    res.json(settings);
  });
});

router.put('/settings', (req, res) => {
  settings.setSettings(req.body, (result) => {
    res.json(result);
  });
});

// *** FLOWS

router.get('/flows', (req, res) => {
  res.json({payload: storage.getFlows()});
});

router.post('/flow', (req, res) => {
  let flow = req.body;
  res.json({payload: storage.addFlow(flow)});
});

router.put('/flow', (req, res) => {
  let flow = req.body;
  res.json({payload: storage.updateFlow(flow)});
});

router.delete('/flow', (req, res) => {
  let id = req.body.id;
  res.json({payload: storage.removeFlow(id)});
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

router.get('/template-keys', (req, res) => {
  let { id, version } = req.query;
  res.json({payload: templates.getKeys(id, version)});
});

router.post('/generate-flow', (req, res) => {
  const { template, version, flow, params } = req.body;

  if (template && flow) {
    templates.generate(template, version, flow, params, () => {
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
