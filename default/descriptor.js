module.exports = {
  params: [{
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
    default: 'org.nuxeo.addon',
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
  }, {
    type: 'input',
    name: 'nuxeo_version',
    message: 'Nuxeo Version:',
    default: '8.1-SNAPSHOT'
  }],
  beforeTemplates: function() {
    // Rebinded to BaseGenerator
    var mkdirp = require('mkdirp');

    mkdirp.sync('src/main/java/' + this.props.package.replace(/\./g, '/'));
    mkdirp.sync('src/main/resources/META-INF');
    mkdirp.sync('src/main/resources/OSGI-INF');

    mkdirp.sync('src/test/java/' + this.props.package.replace(/\./g, '/'));
    mkdirp.sync('src/test/resources/OSGI-INF');
  },
  templates: [{
    src: "pom.xml",
    dest: "pom.xml"
  }, {
    src: "MANIFEST.MF",
    dest: "src/main/resources/META-INF"
  }]
};
