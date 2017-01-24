'use strict';

/**
* Module dependencies.
**/

const express = require('express');
const router = express.Router();
const templates = require('../lib/data/templates');
const storage = require('../lib/data/storage');
const settings = require('../lib/data/settings');
const passport = require('passport');

/**
* Module body.
**/

// *** PATHS

router.get('/',  (req, res) => {
  res.json({
    api: 2
  });
});

router.get('/board', ensureAuthenticated, (req, res) => {
  res.end('board');
});

// *** AUTH

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/api/v1/login');
	}
}

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// router.post('/login/local', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/api/v1/login'}));

router.post('/login/local', function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if (err) throw err;

    console.log(user);

    const success = false;
    if (user) {success = true};
    res.json({success: success});
  })(req, res, next);
});

// *** FUNCTIONS

router.get('/reload', (req, res) => {
  global.app.reloadEditor(() => {
    res.json({payload: true});
  });
});

// *** TEMPLATES

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
