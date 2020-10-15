const helper = require('../../lib/helpers.js');

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
    validate: function(value) {
      const doctypeRegex = '^[a-zA-Z][a-zA-Z0-9_-]*$';
      return value.match(doctypeRegex) ? true : 'A doctype id should start with a letter, and contain alphanumeric characters, dashes and underscores only.';
    }
  }],
  'main-java': [{
    src: 'Adapter.java',
    dest: '{{s.capitalize(s.camelize(doctype))}}Adapter.java'
  }, {
    src: 'AdapterFactory.java',
    dest: '{{s.capitalize(s.camelize(doctype))}}AdapterFactory.java'
  }],
  'test-java': [{
    src: 'TestAdapter.java',
    dest: 'Test{{s.capitalize(s.camelize(doctype))}}Adapter.java'
  }],
  dependencies: [
    'org.nuxeo.ecm.core:nuxeo-core-api',
    'org.nuxeo.runtime:nuxeo-runtime',
    'org.nuxeo.ecm.core:nuxeo-core-test:::test'
  ],
  contributions: [{
    src: 'adapter.xml',
    dest: '{{s.dasherize(s.decapitalize(s.titleize(package + doctype)))}}-adapter-contrib.xml'
  }]
};
