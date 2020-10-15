const helper = require('../../lib/helpers.js');

module.exports = {
  depends: 'default',
  type: 'ftest',
  autonomous: true,
  skip: helper.skips.not_empty_project,
  params: [{
    type: 'input',
    name: 'parent_package',
    message: 'Parent Group id:',
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
    type: 'input',
    name: 'artifact',
    message: 'Project Artifact id:',
    default: function() {
      return global._options.dirname + '-ftest';
    },
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
    default: function() {
      return '1.0-SNAPSHOT';
    },
    validate: helper.validators.version_snapshot
  }, {
    type: 'input',
    name: 'name',
    message: 'Project name:',
    default: function() {
      return global._options.dirname + '-ftest';
    },
    validate: helper.validators.artifact
  }, {
    type: 'input',
    name: 'description',
    message: 'Project description:',
    default: function() {
      return global._options.dirname + ' functional tests';
    }
  }],
  properties: {
    skipNodeITs: 'true'
  },
  plugins: [{
    groupId: 'com.github.eirslett',
    artifactId: 'frontend-maven-plugin',
    configuration: {
      skip: '${skipNodeITs}'
    }
  }],
  install: [{
    cmd: 'npm',
    args: ['install']
  }]
};
