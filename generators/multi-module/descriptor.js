var helper = require('../../lib/helpers.js');

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
    message: 'Use a parent artifact (for instance your company\'s BOM or the org.nuxeo.ecm.distribution:nuxeo-distribution POM)?',
    default: true
  }, {
    type: 'input',
    name: 'super_package',
    store: true,
    message: 'Parent Group id:',
    default: 'org.nuxeo.ecm.distribution',
    validate: helper.validators.package,
    filter: helper.filters.package,
    when: function (answers) {
      return answers.use_bom;
    }
  }, {
    type: 'input',
    name: 'super_artifact',
    message: 'Parent Artifact id:',
    default: 'nuxeo-distribution',
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
    default: helper.nuxeo_version.default_distribution,
    validate: helper.validators.version,
    when: function (answers) {
      return answers.super_package;
    }
  }, {
    type: 'confirm',
    name: 'import_nuxeo',
    message: 'Import Nuxeo in the `dependencyManagement` (useful as you don\'t inherit from `org.nuxeo.ecm.distribution:nuxeo-distribution`)?',
    default: true,
    when: function (answers) {
      return answers.super_package && !answers.super_package.match(/org\.nuxeo\.ecm\.distribution/);
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
    when: function (answers) {
      return !answers.super_artifact || answers.import_nuxeo;
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
  templates: [{
    src: function (props) {
      if (props.bom && props.bom.length > 0) {
        return props.bom;
      } else {
        return 'pom.xml';
      }
    },
    dest: 'pom.xml'
  }]
};
