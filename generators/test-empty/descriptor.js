const helper = require('../../lib/helpers.js');

// Fake Inquirer Separator / with chalk
// See: https://github.com/SBoudrias/Inquirer.js/blob/master/lib/objects/separator.js
const Separator = function (line) {
  this.type = 'separator';
  this.line = ' > \u001b[90m' + line.trim() + '\u001b[22m\u001b[39m';
};

module.exports = {
  params: [{
    type: 'input',
    name: 'package',
    message: 'Unit-Test package:',
    store: true,
    validate: helper.validators.package,
    filter: function (answer) {
      return answer.replace(/\s+/g, '.');
    }
  }, {
    type: 'input',
    name: 'test_name',
    message: 'Unit-Test class name:',
    validate: helper.validators.className
  }, {
    type: 'list',
    name: 'runner_feature',
    message: 'Using Feature:',
    choices: [
      new Separator('Common Features: '), {
        name: 'CoreFeature'
      }, {
        name: 'PlatformFeature'
      }, {
        name: 'AutomationFeature'
      }, {
        name: 'EmbeddedAutomationServerFeature'
      }, {
        name: 'AuditFeature'
      },
      new Separator('Without Feature: '), {
        name: 'None'
      }
    ]
  }],
  // Replace params inside file dest + helpers
  'test-java': [{
    src: 'test.java',
    dest: '{{s.camelize(test_name)}}.java'
  }],
  // <groupId>:<artifactId>[:<version>[:<extension>[:<classifier>]]]
  dependencies: [
    'org.nuxeo.runtime:nuxeo-runtime-test:::test',
    'org.nuxeo.ecm.platform:nuxeo-platform-test:::test',
    'org.nuxeo.ecm.platform:nuxeo-platform-audit-core::test-jar:test',
    'org.nuxeo.ecm.automation:nuxeo-automation-test:::test'
  ]
};
