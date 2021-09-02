const helper = require('../../lib/helpers.js');

// Fake Inquirer Separator / with chalk
// See: https://github.com/SBoudrias/Inquirer.js/blob/master/lib/objects/separator.js
const Separator = function (line) {
  this.type = 'separator';
  this.line = ' > \u001b[90m' + line.trim() + '\u001b[22m\u001b[39m';
};

module.exports = {
  depends: 'default',
  params: [{
    type: 'input',
    name: 'package',
    message: 'Bulk Action package:',
    store: true,
    validate: helper.validators.package
  }, {
    type: 'input',
    name: 'action_name',
    message: 'Bulk Action class name:',
    validate: helper.validators.className
  }, {
    type: 'input',
    name: 'bucket_size',
    message: 'Bucket size (e.g. 100):',
    validate: helper.validators.only_numbers
  }, {
    type: 'input',
    name: 'batch_size',
    message: 'Batch size (e.g. 25):',
    validate: helper.validators.only_numbers,
  }],
  'main-java': [{
    src: 'bulk-action.java',
    dest: '{{s.camelize(action_name)}}.java'
  }],
  'test-java': [{
    src: 'test.java',
    dest: 'Test{{s.camelize(action_name)}}.java'
  }],
  contributions: [{
    src: 'bulk-actions.xml',
    dest: '{{s.dasherize(s.decapitalize(s.titleize(action_name)))}}-bulk-action-contrib.xml'
  }],
  dependencies: [
    'org.nuxeo.ecm.core:nuxeo-core-api',
    'org.nuxeo.ecm.core:nuxeo-core-bulk',
    'org.nuxeo.lib.stream:nuxeo-stream',
    "org.nuxeo.ecm.core:nuxeo-core-test:::test"
  ]
};
