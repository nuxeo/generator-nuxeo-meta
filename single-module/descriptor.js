var helper = require('../helpers.js');

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
    message: 'Parent GroupId:',
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
    default: '8.2-SNAPSHOT',
    when: function(answers) {
      return answers.parent_artifact;
    },
    filter: function(answer) {
      return answer || '';
    }
  }, {
    type: 'input',
    name: 'artifact',
    message: 'Artifact id:',
    validate: helper.validators.artifact
  }, {
    type: 'input',
    name: 'package',
    message: 'Artifact group id:',
    default: 'org.nuxeo.addon',
    store: true,
    validate: helper.validators.package,
    filter: helper.filters.package
  }, {
    type: 'input',
    name: 'version',
    message: 'Bundle version:',
    default: '1.0-SNAPSHOT'
  }, {
    type: 'input',
    name: 'name',
    message: 'Bundle name:',
    validate: helper.validators.required
  }, {
    type: 'input',
    name: 'description',
    message: 'Description :'
  }]
};
