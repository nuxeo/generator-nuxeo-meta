'use strict';
var helper = require('../../lib/helpers.js');

module.exports = {
  type: 'core',
  params: [{
    type: 'input',
    name: 'operation_name',
    message: 'Operation class name:',
    validate: helper.validators.className
  }, {
    type: 'input',
    name: 'package',
    message: 'Operation package:',
    store: true,
    validate: helper.validators.package,
    filter: function(answer) {
      return answer.replace(/\s+/g, '.');
    }
  }, {
    type: 'input',
    name: 'operation_label',
    message: 'Operation label:',
    validate: helper.validators.required
  }, {
    type: 'input',
    name: 'operation_description',
    message: 'Operation description:'
  }],
  // Replace params inside file dest + helpers
  'main-java': [{
    src: 'operation.java',
    dest: '{{s.camelize(operation_name)}}.java'
  }],
  'test-java': [{
    src: 'test.java',
    dest: 'Test{{s.camelize(operation_name)}}.java'
  }],
  contributions: [{
    src: 'operation.xml',
    dest: '{{s.dasherize(s.decapitalize(operation_name))}}-operation-contrib.xml'
  }],
  // <groupId>:<artifactId>[:<version>[:<extension>[:<classifier>]]]
  dependencies: [
    'org.nuxeo.ecm.automation:nuxeo-automation-core',
    'org.nuxeo.ecm.automation:nuxeo-automation-test:::test'
  ]
};
