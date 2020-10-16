const helper = require('../../lib/helpers.js');

module.exports = {
  depends: 'single-module',
  description: 'Your project parent POM',
  type: 'root',
  order: -10,
  skip: function () {
    return this.fs.exists('pom.xml');
  },
  config: {
    multi: true
  },
  params: [{
    type: 'confirm',
    name: 'use_bom',
    message: 'Use a parent artifact (for instance your company\'s BOM or the Nuxeo Distribution POM)?',
    default: false
  }, {
    type: 'confirm',
    name: 'use_nuxeo_bom',
    message: 'Use the Nuxeo Distribution POM?',
    default: false,
    when: function (answers) {
      return answers.use_bom;
    }
  }, {
    type: 'input',
    name: 'super_package',
    store: true,
    message: 'Parent Group id:',
    validate: helper.validators.package,
    filter: helper.filters.package,
    when: function (answers) {
      return answers.use_bom && !answers.use_nuxeo_bom;
    }
  }, {
    type: 'input',
    name: 'super_artifact',
    message: 'Parent Artifact id:',
    validate: helper.validators.parent_artifact,
    filter: function (answer) {
      return answer.trim();
    },
    when: function (answers) {
      return answers.super_package;
    }
  }, {
    type: 'input',
    name: 'super_version',
    store: true,
    message: 'Parent Version:',
    validate: helper.validators.version,
    when: function (answers) {
      return answers.super_package;
    }
  }, {
    type: 'confirm',
    name: 'import_nuxeo',
    message: 'Import Nuxeo in the `dependencyManagement` (useful as you don\'t inherit from the Nuxeo distribution POM)?',
    default: true,
    when: function (answers) {
      return answers.use_bom && !answers.use_nuxeo_bom;
    }
  }, {
    type: 'input',
    name: 'nuxeo_version',
    message: 'Nuxeo Version:',
    default: helper.nuxeo_version.default,
    store: true,
    validate: helper.validators.version,
    filter: helper.nuxeo_version.filter,
    when: function (answers) {
      return answers.use_nuxeo_bom || !answers.use_bom || answers.import_nuxeo;
    }
  }, {
    type: 'input',
    name: 'parent_package',
    message: 'Project Group id:',
    store: true,
    validate: helper.validators.package,
    filter: helper.filters.package
  }, {
    type: 'input',
    name: 'parent_artifact',
    message: 'Project Artifact id:',
    store: true,
    default: function () {
      return global._options.dirname + '-parent';
    },
    validate: helper.validators.artifact
  }, {
    type: 'input',
    name: 'parent_version',
    message: 'Project Version:',
    store: true,
    default: function () {
      return '1.0-SNAPSHOT';
    },
    validate: helper.validators.version_snapshot
  }, {
    type: 'input',
    name: 'description',
    message: 'Project Description:'
  }],
  getTemplatesFolder: function(props) {
    // Return the proper templates folder based on the version
    if (props.v === undefined || props.v.isBefore('11.1')) {
      return 'templates-7.10';
    } else {
      return 'templates-11.1';
    }
  }
};
