module.exports = {
  depends: 'single-module',
  type: "root",
  order: -10,
  skip: function() {
    return this.fs.exists('pom.xml');
  },
  before: function() {
    this.config.set('multi', true);
  },
  params: [{
    type: 'input',
    name: 'bom',
    message: 'BOM path:'
  }, {
    type: 'input',
    name: 'name',
    message: 'Bundle name:',
    store: true,
    validate: function(value) {
      return value.length > 0;
    }
  }, {
    type: 'input',
    name: 'package',
    message: 'Bundle package:',
    store: true,
    validate: function(value) {
      return value.split('.').length > 0;
    }
  }, {
    type: 'input',
    name: 'version',
    message: 'Bundle version:',
    default: '1.0-SNAPSHOT'
  }, {
    type: 'input',
    name: 'artifact',
    message: 'Artifact id:',
    validate: function(value) {
      return value.length > 0;
    }
  }, {
    type: 'input',
    name: 'description',
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
