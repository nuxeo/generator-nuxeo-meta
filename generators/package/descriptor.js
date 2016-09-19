
var helper = require('../../lib/helpers.js');
var path = require('path');

module.exports = {
  type: 'package',
  depends: 'multi-module',
  autonomous: true,
  ensure: function() {
    return this._isMultiModule();
  },
  params: [{
    type: 'input',
    name: 'parent_package',
    message: 'Parent Group id:',
    store: true,
    validate: helper.validators.package
  }, {
    type: 'input',
    name: 'parent_artifact',
    message: 'Parent Artifact id:',
    store: true,
    validate: helper.validators.artifact
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
    default: function() {
      return path.basename(path.resolve('.')) + '-package';
    },
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
