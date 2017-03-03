
var helper = require('../../lib/helpers.js');

module.exports = {
  depends: 'seam',
  type: 'jsf',
  params: [{
    type: 'input',
    name: 'package',
    message: 'Action package:',
    store: true,
    validate: helper.validators.package
  }, {
    type: 'input',
    name: 'controller_name',
    message: 'Controller Class name:',
    validate: helper.validators.className
  }],
  'main-java': [{
    src: 'controller.java',
    dest: '{{s.classify(s.camelize(controller_name))}}.java'
  }],
  dependencies: [
    'org.jboss.seam:jboss-seam',
    'org.nuxeo.ecm.core:nuxeo-core-api',
    'org.nuxeo.ecm.platform:nuxeo-platform-webapp-base',
    'org.nuxeo.ecm.platform:nuxeo-platform-ui-web'
  ]
};
