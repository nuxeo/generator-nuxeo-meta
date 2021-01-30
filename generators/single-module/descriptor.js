const helper = require('../../lib/helpers.js');
const path = require('path');

module.exports = {
  order: -5,
  skip: function(type) {
    const pom = path.join(this._getBaseFolderName(type), 'pom.xml');
    return this.fs.exists(pom);
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
      return !helper.rootGenerator()._hasNuxeoVersion() && answers.parent_artifact && !answers.parent_package.match(/^org\.nuxeo/);
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
      const type = global._scope.type || global._options.type;
      return global._options.dirname + '-' + type;
    },
    validate: helper.validators.artifact
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
    name: 'description',
    message: 'Project description:'
  }],
  getTemplatesFolder: function(props) {
    // Return the proper templates folder based on the version
    if (props.v === undefined || props.v.isBefore('10.10')) {
      return 'templates-7.10';
    } else if (props.v.isAfterOrEquals('10.10') || props.v.isBefore('11.1')) {
      return 'templates-10.10';
    } else {
      return 'templates-11.1';
    }
  }
};
