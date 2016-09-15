var helper = require('../../lib/helpers.js');
var path = require('path');

module.exports = {
  depends: 'default',
  type: 'web',
  autonomous: true,
  skip: helper.skips.not_empty_project,
  params: [{
    type: 'input',
    name: 'parent_package',
    default: 'org.nuxeo.ecm.distribution',
    message: 'Parent Group id:',
    store: true,
    validate: helper.validators.package
  }, {
    type: 'input',
    name: 'parent_artifact',
    default: 'nuxeo-distribution',
    message: 'Parent Artifact id:',
    store: true,
    validate: helper.validators.artifact
  }, {
    type: 'input',
    name: 'parent_version',
    message: 'Parent version:',
    store: true,
    default: helper.nuxeo_version.default_distribution,
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
