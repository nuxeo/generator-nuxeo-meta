
var helper = require('../../lib/helpers.js');

module.exports = {
  type: 'kotlin',
  depends: 'kotlin-module',
  params: [{
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
    name: 'operation_name',
    message: 'Operation class name:',
    validate: helper.validators.className
  }, {
    type: 'input',
    name: 'operation_label',
    message: 'Operation label:',
    validate: helper.validators.required
  }],
  contributions: [{
    src: 'operation.xml',
    dest: '{{s.dasherize(s.decapitalize(s.titleize(operation_name)))}}-operation-contrib.xml'
  }],
  dependencies: [
    'org.nuxeo.ecm.automation:nuxeo-automation-core',
    'org.nuxeo.ecm.automation:nuxeo-automation-test:::test'
  ]
};
