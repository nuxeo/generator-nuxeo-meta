
var helper = require('../../lib/helpers.js');

module.exports = {
  depends: 'default',
  type: 'jsf',
  dependencies: [
    'org.nuxeo.runtime:nuxeo-runtime',
    'org.nuxeo.runtime:nuxeo-runtime-test:::test',
    'org.nuxeo.ecm.platform:nuxeo-platform-test:::test'
  ]
};
