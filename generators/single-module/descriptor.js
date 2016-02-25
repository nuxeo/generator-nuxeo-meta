'use strict';
var helper = require('../../lib/helpers.js');

module.exports = {
  order: -5,
  skip: function() {
    return this.fs.exists('pom.xml');
  },
  params: [{
    type: 'input',
    name: 'parent_artifact',
    message: 'Parent Artifact id (use white space to cancel default value.):',
    store: true,
    validate: helper.validators.parent_artifact,
    filter: function(answer) {
      return answer ? answer.trim() : '';
    }
  }, {
    type: 'input',
    name: 'parent_package',
    message: 'Parent Group id:',
    default: 'org.nuxeo',
    store: true,
    when: function(answers) {
      return answers.parent_artifact;
    },
    validate: helper.validators.package,
    filter: helper.filters.package
  }, {
    type: 'input',
    name: 'parent_version',
    message: 'Parent Version:',
    store: true,
    validate: helper.validators.version,
    when: function(answers) {
      return answers.parent_artifact;
    },
    filter: function(answer) {
      return answer || '';
    }
  }, {
    type: 'list',
    name: 'nuxeo_version',
    message: 'Nuxeo Version:',
    default: helper.nuxeo_version.default,
    store: true,
    choices: helper.nuxeo_version.choices,
    validate: helper.validators.version,
    filter: helper.nuxeo_version.filter,
    when: function(answers) {
      // If parent_artifact undefined, it was handled previously
      return typeof answers.parent_artifact !== 'undefined' && !answers.parent_artifact;
    }
  }, {
    type: 'input',
    name: 'artifact',
    message: 'Project Artifact id:',
    validate: helper.validators.artifact
  }, {
    type: 'input',
    name: 'package',
    message: 'Project Group id:',
    store: true,
    validate: helper.validators.package,
    filter: helper.filters.package
  }, {
    type: 'input',
    name: 'version',
    message: 'Project version:',
    default: '1.0-SNAPSHOT',
    validate: helper.validators.version_snapshot
  }]
};
