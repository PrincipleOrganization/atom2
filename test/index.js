'use strict';

const fs = require('fs');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const S = require('string');
const templates = require('../lib/templates');
const storage = require('../lib/storage');

describe('Templates', () => {
  it('generate', () => {
    templates.generate('Test template', '1', 'Test 3');
  });
});

describe('Storage', () => {
  it('get all', () => {
    let devices = storage.getDevices();
  });

  it('update device', () => {
    let obj = {
      _id: 0,
      id: "ACM0",
      template: {
        id: "Test template",
        version: "1"
      }
    };

    storage.updateDevice(obj);
  });

  it('add device', () => {
    let obj = {
      id: "ACM3",
      template: {
        id: "Test template",
        version: "1"
      }
    };

    storage.addDevice(obj);
  });

  it('remove device', () => {
    storage.removeDevice(3);
  });
});
