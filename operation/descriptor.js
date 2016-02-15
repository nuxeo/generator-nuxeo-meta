module.exports = {
  type: "core",
  params: [{
    type: 'input',
    name: 'operation_name',
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
    name: 'operation_label',
    message: 'Operation label:'
  }, {
    type: 'input',
    name: 'operation_description',
    message: 'Operation description:'
  }],
  // Replace params inside file dest + helpers
  'main-java': [{
    src: "operation.java",
    dest: "{{s.camelize(operation_name)}}.java"
  }],
  'test-java': [{
    src: "test.java",
    dest: "Test{{s.camelize(operation_name)}}.java"
  }],
  contributions: [{
    src: "operation.xml",
    dest: "{{s.dasherize(s.decapitalize(operation_name))}}-contrib.xml"
  }],
  // <groupId>:<artifactId>[:<version>[:<extension>[:<classifier>]]]
  dependencies: [
    "org.nuxeo.ecm.automation:nuxeo-automation-core",
    "org.nuxeo.ecm.automation:nuxeo-automation-test:::test"
  ]
};
