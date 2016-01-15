module.exports = {
  type: "marketplace",
  depends: 'multi-module',
  params: [{
    type: 'input',
    name: 'parentArtifact',
    message: 'Parent Artifact id:',
    store: true,
    validate: function(value) {
      return value.length > 0;
    }
  }, {
    type: 'input',
    name: 'package',
    message: 'GroupId:',
    store: true,
    validate: function(value) {
      return value.split('.').length > 1;
    }
  }, {
    type: 'input',
    name: 'version',
    message: 'Bundle version:',
    store: true,
    default: '1.0-SNAPSHOT'
  }, {
    type: 'input',
    name: 'name',
    message: 'Package name:',
    validate: function(value) {
      return value.indexOf(' ') < 0 && value.length > 1 && value.match(/^[A-Z]/) !== null;
    }
  }, {
    type: 'input',
    name: 'title',
    message: 'Package title:'
  }, {
    type: 'input',
    name: 'company',
    message: 'Company name:'
  }],
  templates: [{
    src: 'pom.xml',
    dest: 'pom.xml'
  }, {
    src: 'assembly.xml',
    dest: 'src/main/assemble/assembly.xml'
  }, {
    src: 'install.xml',
    dest: 'src/main/resources/install.xml'
  }, {
    src: 'package.xml',
    dest: 'src/main/resources/package.xml'
  }, {
    src: 'nuxeo.defaults',
    dest: 'src/main/resources/install/templates/{{s.dasherize(s.decapitalize(name))}}/nuxeo.defaults'
  }]
};
