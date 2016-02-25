'use strict';
var helper = require('../../lib/helpers.js');

module.exports = {
  depends: 'single-module',
  type: 'root',
  order: -10,
  skip: function() {
    return this.fs.exists('pom.xml');
  },
  config: {
    multi: true
  },
  params: [{
    type: 'input',
    name: 'super_artifact',
    message: 'Parent Artifact id:',
    default: 'nuxeo-distribution',
    validate: helper.validators.parent_artifact,
    filter: function(answer) {
      return answer.trim();
    }
  }, {
    type: 'input',
    name: 'super_package',
    message: 'Parent group id:',
    default: 'org.nuxeo.ecm.distribution',
    validate: helper.validators.package,
    filter: helper.filters.package,
    when: function(answers) {
      return answers.super_artifact;
    }
  }, {
    type: 'input',
    name: 'super_version',
    message: 'Parent Version:',
    default: helper.nuxeo_version.default_distribution,
    validate: helper.validators.version,
    when: function(answers) {
      return answers.super_artifact;
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
      return !answers.super_artifact;
    }
  }, {
    type: 'input',
    name: 'parent_artifact',
    message: 'Project Artifact id:',
    store: true,
    validate: helper.validators.artifact
  }, {
    type: 'input',
    name: 'parent_package',
    message: 'Project group id:',
    store: true,
    validate: helper.validators.package,
    filter: helper.filters.package
  }, {
    type: 'input',
    name: 'parent_version',
    message: 'Project version:',
    store: true,
    default: '1.0-SNAPSHOT',
    validate: helper.validators.version_snapshot
  }],
  templates: [{
    src: function(props) {
      if (props.bom && props.bom.length > 0) {
        return props.bom;
      } else {
        return 'pom.xml';
      }
    },
    dest: 'pom.xml'
  }]
};
