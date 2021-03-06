
const helper = require('../../lib/helpers.js');

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
    dest: '{{s.camelize(service_name)}}Impl.java',
    when: function(answers) {
      return answers.v.isBefore('9.10');
    }
  }, {
    src: 'interface.java',
    dest: '{{s.camelize(service_name)}}.java'
  }, {
    src: 'implementation-9.10.java',
    dest: '{{s.camelize(service_name)}}Impl.java',
    when: function(answers) {
      return answers.v.isAfterOrEquals('9.10');
    }
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
