'use strict';
var helper = require('../../lib/helpers.js');
var path = require('path');

module.exports = {
  depends: 'default',
  type: 'web',
  autonomous: true,
  skip: function(type) {
    var pom = path.join(this._getBaseFolderName(type), 'pom.xml');
    return this.fs.exists(pom);
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
    message: 'Artifact id:',
    default: function() {
      return path.basename(path.resolve('.')) + '-web';
    },
    validate: helper.validators.artifact
  }, {
    type: 'input',
    name: 'name',
    message: 'Application name:',
    validate: helper.validators.required
  }, {
    type: 'input',
    name: 'route',
    message: 'Application route:',
    default: function() {
      return 'app';
    },
    validate: helper.validators.route
  }],
  contributions: [{
    src: 'auth.xml',
    dest: '{{s.dasherize(s.decapitalize(name))}}-auth-contrib.xml'
  }]
};
