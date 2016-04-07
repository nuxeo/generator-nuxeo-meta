'use strict';
var helper = require('../../lib/helpers.js');
var path = require('path');

module.exports = {
  order: -5,
  skip: function() {
    return this.fs.exists('pom.xml');
  },
  params: [{
    type: 'input',
    name: 'parent_package',
    message: 'Parent Group id (use white space to cancel default value.):',
    default: 'org.nuxeo',
    store: true,
    validate: function(value) {
      return value.match(/^\s+$/) ? true : helper.validators.package(value);
    },
    filter: helper.filters.package
  }, {
    type: 'input',
    name: 'parent_artifact',
    message: 'Parent Artifact id:',
    default: 'nuxeo-addons-parent',
    store: true,
    validate: helper.validators.parent_artifact,
    when: function(answers) {
      return answers.parent_package;
    }
  }, {
    type: 'input',
    name: 'parent_version',
    message: 'Parent Version:',
    store: true,
    validate: helper.validators.version,
    default: helper.nuxeo_version.default_distribution,
    when: function(answers) {
      return answers.parent_package;
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
      return !answers.parent_artifact || !answers.parent_package.match(/^org\.nuxeo/);
    }
  }, {
    type: 'input',
    name: 'package',
    message: 'Project Group id:',
    store: true,
    validate: helper.validators.package,
    filter: helper.filters.package
  }, {
    type: 'input',
    name: 'artifact',
    message: 'Project Artifact id:',
    default: function() {
      return path.basename(path.resolve('.')) + '-core';
    },
    validate: helper.validators.artifact
  }, {
    type: 'input',
    name: 'version',
    message: 'Project version:',
    default: '1.0-SNAPSHOT',
    validate: helper.validators.version_snapshot
  }, {
    type: 'input',
    name: 'description',
    message: 'Project description:'
  }]
};
