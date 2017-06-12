'use strict';

const fs = require('fs');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const S = require('string');
const templates = require('../lib/data/templates');
const storage = require('../lib/data/storage');
const utils = require('../lib/utils');
const settings = require('../lib/data/settings');
const logger = require('../lib/logger');

describe('Settings', () => {
  it('init', () => {
    settings.init();
    const s = settings.getSettingsSync();
    console.log(s);
  })

  it('get', () => {
    const s = settings.getSettingsSync();
    console.log(s);
  })

  it('set', () => {
    settings.setSettingsSync({
      logs: {storeLogs: false},
      auth: {
        username: 'princip',
        password: 'princip',
        jwtSecret: 'HweJUl8932cnFdj242376dcvnkj214872csjx5'
      }
    });
    const s = settings.getSettingsSync();
    console.log(s);
  })
});
