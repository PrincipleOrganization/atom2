'use strict';

/**
* Module dependencies.
**/

const fs = require('fs');
const path = require('path');
const S = require('string');
const utils = require('../../utils');
const templatesUtils = require('./utils');
const logger = require('../../logger');

/**
* Module body.
**/

const NODE_ID   = 'NODE_ID';
const FLOW_ID   = 'FLOW_ID';
const FLOW_NAME = 'FLOW_NAME';

let keysTemplates = [
  {label: NODE_ID, type: 'id'},
  {label: FLOW_ID, type: 'id'},
  {label: FLOW_NAME, type: 'field'}
];

const filePath = './data/templates.json';
const pathFileFlow = './data/flows.json';

//*** Main functions

const init = function() {
  utils.createFolderIfNotExist('./data');
  utils.createFileIfNotExist(filePath, '[]');

  let templates = getTemplatesFromFile();
  if (templates.length === 0) {
    updateTemplatesFile(templates);
  }
}

const getTemplates = function() {
  return getTemplatesFromFile();
}

const addTemplate = function(template) {
  let success = true;

  try {
    let templates = getTemplatesFromFile();
    templates.push(template);
    updateTemplatesFile(templates);
  } catch (err) {
    logger.err(err);
    success = false;
  }

  return success;
}

const removeTemplate = function(id, version) {
  let templates = getTemplatesFromFile();
  for (let i in templates) {
    if (templates[i].id === id && templates[i].version === version) {
      templates.splice(i, 1);
    }
  }
  updateTemplatesFile(templates);

  return true;
}

const updateTemplate = function(template) {
  let success = true;

  try {
    let templates = getTemplatesFromFile();
    for (let i in templates) {
      if (templates[i].id === template.id && templates[i].version === template.version) {
        templates[i] = template;
      }
    }
    updateTemplatesFile(templates);
  } catch (err) {
    logger.err(err);
    success = false;
  }

  return success;
}

const getTemplateKeys = function(templateId, templateVersion) {
  let keys = [];

  let template = getTemplate(templateId, templateVersion);
  if (template) {
    keys = getKeys(template);
  }

  return keys;
}

const generateFlowFromTemplate = function(templateId, templateVersion, flowName, params, callback) {
  let template = getTemplate(templateId, templateVersion);
  if (template) {
    let flow = template;
    let keys = getKeys(template);

    for (let i in keys) {
      let key = keys[i];
      for (let j in keysTemplates) {
        let keyTemplate = keysTemplates[j];
        if (S(key).contains(keyTemplate.label)) {
          if (keyTemplate.type === 'id') {
            let nodeId = generateNodeId();
            flow = S(flow).replaceAll(`%%${key}%%`, nodeId).s;
          }

          if (keyTemplate.label === FLOW_NAME) {
            flow = S(flow).replaceAll(`%%${key}%%`, flowName).s;
          }
        }
      }

      if (params[key] !== undefined) {
        flow = S(flow).replaceAll(`%%${key}%%`, params[key]).s;
      }
    }

    if (flow) {
      let flows = getFlows(flowName);

      let flowJson = JSON.parse(flow);

      let templateFlows = flowJson;
      for (let i in templateFlows) {
        flows.push(templateFlows[i]);
      }

      flows = JSON.stringify(flows);
      // TODO: save to file
      fs.writeFileSync(pathFileFlow, flows);
    }
  }

  if (callback) {
    callback();
  }
}

//*** Helpers

const readFileWithTemplates = function() {
  if (fs.existsSync(filePath)) {
    const templateBuffer = fs.readFileSync(filePath);
    return templateBuffer.toString();
  } else {
    return '[]';
  }
}

const getTemplatesFromFile = function() {
  let templatesJson = [];

  try {
    const templates = readFileWithTemplates();
    templatesJson = JSON.parse(templates);
  } catch (err) {
    logger.err(err);
  }

  return templatesJson;
}

const getTemplate = function(templateId, version) {
  let templateString = '';

  let templatesJson = getTemplatesFromFile();
  for (let i in templatesJson) {
    let currentTemplate = templatesJson[i];
    if (currentTemplate.id === templateId && currentTemplate.version === version) {
      templateString = JSON.stringify(currentTemplate.template);
    }
  }

  return templateString;
}

const getKeys = function(template) {
  let keys = templatesUtils.getFromBetween.get(template, '%%', '%%');
  let uniqueKeys = keys.filter(function(item, pos) {
    return keys.indexOf(item) == pos;
  });

  return uniqueKeys;
}

const generateNodeId = function() {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz';

  const randomString = function(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  let first = randomString(8, chars);
  let second = randomString(5, chars);

  return `${first}.${second}`;
}

const readFileWithFlows = function() {
  let flows = '[]';

  if (fs.existsSync(pathFileFlow)) {
    const flowsBuffer = fs.readFileSync(pathFileFlow);
    flows = flowsBuffer.toString();
  }

  if (S(flows).isEmpty()) {
    flows = '[]';
  }

  return flows;
}

const getFlows = function(flowName) {
  let tabId;

  let flows = readFileWithFlows();
  let flowsJson = JSON.parse(flows);
  for (let i in flowsJson) {
    let currentFlow = flowsJson[i];
    if (currentFlow.type === 'tab' && currentFlow.label === flowName) {
      tabId = currentFlow.id;
      break;
    }
  }

  let nodes = [];
  if (tabId) {
    for (let i in flowsJson) {
      let currentFlow = flowsJson[i];
      if (currentFlow.type !== 'tab' && currentFlow.z !== tabId) {
        nodes.push(currentFlow);
      } else if (currentFlow.type === 'tab' && currentFlow.id !== tabId) {
        nodes.push(currentFlow);
      }
    }
  } else {
    nodes = flowsJson;
  }

  return nodes;
}

const updateTemplatesFile = function(templates) {
  fs.writeFileSync(filePath, JSON.stringify(templates));
}

/**
* Export.
**/

module.exports = {
  init: init,
  getTemplates: getTemplates,
  addTemplate: addTemplate,
  removeTemplate: removeTemplate,
  updateTemplate: updateTemplate,
  getKeys: getTemplateKeys,
  generate: generateFlowFromTemplate
}
