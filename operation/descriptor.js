module.exports = {
  type: "core",
  params: [{
    type: 'input',
    name: 'name',
    message: 'Operation name:',
    validate: function(value) {
      return value.length > 1 && value.match(/^[A-Z]/) !== null;
    }
  }, {
    type: 'input',
    name: 'package',
    message: 'Operation package:',
    store: true,
    validate: function(value) {
      return value.split('.').length > 1;
    }
  }, {
    type: 'input',
    name: 'label',
    message: 'Operation label:'
  }, {
    type: 'input',
    name: 'description',
    message: 'Operation description:'
  }],
  // Replace params inside file dest + helpers
  templates: [{
    src: "operation.java",
    dest: "src/main/java/{{s.replaceAll(package, '\\\\.', '/')}}/{{s.capitalize(name)}}.java"
  }, {
    src: "test.java",
    dest: "src/test/java/{{s.replaceAll(package, '\\\\.', '/')}}/Test{{s.capitalize(name)}}.java"
  }],
  // <groupId>:<artifactId>[:<version>[:<extension>[:<classifier>]]]
  dependencies: [
    "org.nuxeo.ecm.automation:nuxeo-automation-core"
  ],
  contributions: [{
    src: "operation.xml"
  }]
};
