'use strict';
var helper = require('../../lib/helpers.js');

module.exports = {
  type: 'marketplace',
  depends: 'multi-module',
  ensure: function() {
    return this.config.get('multi');
  },
  params: [{
    type: 'input',
    name: 'parent_artifact',
    message: 'Parent Artifact id:',
    store: true,
    validate: helper.validators.artifact
  }, {
    type: 'input',
    name: 'parent_package',
    message: 'Parent Group id:',
    store: true,
    validate: helper.validators.package
  }, {
    type: 'input',
    name: 'parent_version',
    message: 'Parent version:',
    store: true,
    default: '1.0-SNAPSHOT',
    validate: helper.validators.version_snapshot
  }, {
    type: 'input',
    name: 'artifact',
    message: 'Package Artifact id:',
    validate: helper.validators.artifact
  }, {
    type: 'input',
    name: 'name',
    message: 'Package name:',
    validate: helper.validators.package_name
  }, {
    type: 'input',
    name: 'company',
    message: 'Company name:'
  }],
  dependencies: 'inherited'
};
