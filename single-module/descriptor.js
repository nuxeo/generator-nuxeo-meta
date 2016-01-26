module.exports = {
  order: -5,
  skip: function() {
    return this.fs.exists('pom.xml');
  },
  params: [{
    type: 'input',
    name: 'parentArtifact',
    message: 'Parent Artifact id:',
    store: true
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
    name: 'name',
    message: 'Bundle name:',
    validate: function(value) {
      return value.length > 0 ? true : 'Bundle name is required.';
    }
  }, {
    type: 'input',
    name: 'description',
    message: 'Description :'
  }, {
    type: 'input',
    name: 'nuxeo_version',
    message: 'Nuxeo Version:',
    default: '8.1-SNAPSHOT',
    when: function (answers) {
      return !answers.parentArtifact;
    },
    filter: function(answer) {
      return answer || '';
    }
  }],
  beforeGeneration: function(params) {
    var mkdirp = this._require('mkdirp');
    var path = this._require('path');

    // Rebinded to BaseGenerator
    var src = path.join(this._getBaseFolderName(), 'src');

    mkdirp.sync(path.join(src, 'main/java/' + params.package.replace(/\./g, '/')));
    mkdirp.sync(path.join(src, 'main/resources/META-INF'));
    mkdirp.sync(path.join(src, 'main/resources/OSGI-INF'));

    mkdirp.sync(path.join(src, 'test/java/' + params.package.replace(/\./g, '/')));
    mkdirp.sync(path.join(src, 'test/resources/OSGI-INF'));
  },
  templates: [{
    src: "pom.xml",
    dest: "pom.xml"
  }, {
    src: "MANIFEST.MF",
    dest: "src/main/resources/META-INF/MANIFEST.MF"
  }]
};
