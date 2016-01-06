module.exports = {
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
    dest: "src/main/java/{{package:/\./,'/'}}/{{name:uppercase}}.java"
  }, {
    src: "test.java",
    dest: "src/test/java/{{package:/\./,'/'}}/Test{{name:uppercase}}.java"
  }],
  // <groupId>:<artifactId>[:<version>[:<extension>[:<classifier>]]]
  dependencies: [
    "org.nuxeo.ecm.automation:nuxeo-automation-core"
  ],
  contributions: [{
    // recomputed contribution (all those kind of contribution inside one xml file)
    target: "org.nuxeo.ecm.core.operation.OperationServiceComponent",
    point: "operations",
    src: "operation.xml"
  }, {
    // full contribution (copy the file)
    src: "full-contrib.xml"
  }]
};
