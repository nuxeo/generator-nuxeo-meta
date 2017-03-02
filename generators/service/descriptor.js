
var helper = require('../../lib/helpers.js');

module.exports = {
  depends: 'default',
  params: [{
    type: 'input',
    name: 'package',
    message: 'Service package:',
    store: true,
    validate: helper.validators.package
  }, {
    type: 'input',
    name: 'service_name',
    message: 'Service interface name:',
    validate: helper.validators.className
  }],
  'main-java': [{
    src: 'implementation.java',
    dest: '{{s.camelize(service_name)}}Impl.java'
  }, {
    src: 'interface.java',
    dest: '{{s.camelize(service_name)}}.java'
  }],
  'test-java': [{
    src: 'test.java',
    dest: 'Test{{s.camelize(service_name)}}.java'
  }],
  contributions: [{
    src: 'service.xml',
    dest: '{{s.dasherize(s.decapitalize(s.titleize(service_name)))}}-service.xml'
  }],
  dependencies: [
    'org.nuxeo.runtime:nuxeo-runtime',
    'org.nuxeo.runtime:nuxeo-runtime-test:::test',
    'org.nuxeo.ecm.platform:nuxeo-platform-test:::test'
  ]
};
