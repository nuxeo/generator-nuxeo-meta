'use strict';
var helper = require('../../lib/helpers.js');

module.exports = {
  depends: 'default',
  skip: function() {},
  type: 'core',
  config: {},
  params: [{
    type: 'input',
    name: 'package',
    message: 'Document Adapter Package:',
    store: true,
    validate: helper.validators.package
  }, {
    type: 'input',
    name: 'doctype',
    message: 'Document Type ID:',
    store: true,
    validate: function(value) {
      var doctypeRegex = '^[a-zA-Z][a-zA-Z0-9_-]*$';
      return value.match(doctypeRegex) ? true : 'A doctype id should start with a letter, and contain alphanumeric characters, dashes and underscores only.';
    }
  }],
  'main-java': [{
    src: 'Adapter.java',
    dest: '{{s.capitalize(doctype)}}Adapter.java'
  }, {
    src: 'AdapterFactory.java',
    dest: '{{s.capitalize(doctype)}}AdapterFactory.java'
  }],
  dependencies: ['org.nuxeo.ecm.core:nuxeo-core-api'],
  contributions: [{
    src: 'adapter.xml',
    dest: '{{s.dasherize(s.decapitalize(package + doctype))}}-adapter-contrib.xml'
  }]
};
