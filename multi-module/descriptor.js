var helper = require('../helpers.js');

module.exports = {
  depends: 'single-module',
  type: "root",
  order: -10,
  skip: function() {
    var pomExists = this.fs.exists('pom.xml');
    if (pomExists) {
      this.log.conflict('The current folder contains an existing project.')
    }
    return pomExists;
  },
  config: {
    multi: true
  },
  params: [{
    type: 'input',
    name: 'super_artifact',
    message: 'Parent Artifact id:',
    default: 'nuxeo-distribution',
    validate: helper.validators.artifact
  }, {
    type: 'input',
    name: 'super_package',
    message: 'Parent group id:',
    default: 'org.nuxeo.ecm.distribution',
    validate: helper.validators.package,
    filter: helper.filters.package
  }, {
    type: 'input',
    name: 'super_version',
    message: 'Parent Version:',
    default: '8.2-SNAPSHOT',
    validate: helper.validators.version,
  }, {
    type: 'input',
    name: 'parent_artifact',
    message: 'Artifact id:',
    store: true,
    validate: helper.validators.artifact
  }, {
    type: 'input',
    name: 'parent_package',
    message: 'Artifact group id:',
    store: true,
    validate: helper.validators.package,
    filter: helper.filters.package
  }, {
    type: 'input',
    name: 'parent_version',
    message: 'Bundle version:',
    store: true,
    default: '1.0-SNAPSHOT',
    validate: helper.validators.version_snapshot,
  }, {
    type: 'input',
    name: 'multi_name',
    message: 'Bundle name:',
    validate: helper.validators.required
  }, {
    type: 'input',
    name: 'multi_description',
    message: 'Description :'
  }],
  templates: [{
    src: function(props) {
      if (props.bom && props.bom.length > 0) {
        return props.bom;
      } else {
        return "pom.xml";
      }
    },
    dest: "pom.xml"
  }]
};
