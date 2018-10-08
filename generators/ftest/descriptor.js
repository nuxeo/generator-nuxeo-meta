var helper = require('../../lib/helpers.js');

module.exports = {
  depends: 'default',
  type: 'ftest',
  autonomous: true,
  skip: helper.skips.not_empty_project,
  params: [{
    type: 'input',
    name: 'parent_package',
    default: function() {
      return 'org.nuxeo.' + global._options.dirname;
    },
    message: 'Parent Group id:',
    store: true,
    validate: helper.validators.package
  }, {
    type: 'input',
    name: 'parent_artifact',
    default: function() {
      return global._options.dirname + '-parent';
    },
    message: 'Parent Artifact id:',
    store: true,
    validate: helper.validators.artifact
  }, {
    type: 'input',
    name: 'parent_version',
    message: 'Parent Version:',
    store: true,
    default: '1.0-SNAPSHOT',
    validate: helper.validators.version
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
    name: 'version',
    message: 'Project Version:',
    default: function() {
      return global.parent_version;
    },
    validate: helper.validators.version_snapshot,
    when: function(answers) {
      return !(answers.parent_version && answers.parent_version.match(/-SNAPSHOT$/i));
    }
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
