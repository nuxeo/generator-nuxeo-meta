
module.exports = {
  depends: "default",
  params: [
    {
      type: 'input',
      name: 'package',
      message: 'Service package:',
      store: true,
      validate: function(value) {
        return value.split('.').length > 1;
      }
    }, {
      type: 'input',
      name: 'service_name',
      message: 'Service class name:',
      validate: function(value) {
        return value.length > 1 && value.match(/^[A-Z]/) !== null && value.indexOf(' ') < 0 ? true : 'Invalid Service class name.';
      }
    }
  ],
  'main-java': [{
    src: "implementation.java",
    dest: "{{s.camelize(service_name)}}Impl.java"
  }, {
    src: "interface.java",
    dest: "{{s.camelize(service_name)}}.java"
  }],
  'test-java': [{
    src: "test.java",
    dest: "Test{{s.camelize(service_name)}}.java"
  }],
  contributions: [{
    src: 'service.xml',
    dest: "{{s.dasherize(s.decapitalize(service_name))}}-service.xml"
  }],
  dependencies: [
    "org.nuxeo.runtime:nuxeo-runtime-test:::test",
    "org.nuxeo.ecm.platform:nuxeo-platform-test:::test"
  ]
}
