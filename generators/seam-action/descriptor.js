
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
    name: 'action_name',
    message: 'Action name:',
    validate: helper.validators.only_chars
  }],
  'main-java': [{
    src: 'bean.java',
    dest: '{{s.classify(s.camelize(action_name))}}ActionBean.java'
  }],
  contributions: [{
    src: 'action.xml',
    dest: '{{s.dasherize(s.decapitalize(s.titleize(action_name)))}}-action.xml'
  }],
  dependencies: [
    'org.jboss.seam:jboss-seam',
    'org.nuxeo.ecm.core:nuxeo-core-api',
    'org.nuxeo.ecm.platform:nuxeo-platform-webapp-base'
  ]
};
