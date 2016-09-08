var helper = require('../../lib/helpers.js');

module.exports = {
  depends: 'default',
  params: [{
    type: 'input',
    name: 'package',
    message: 'Enricher package:',
    store: true,
    validate: helper.validators.package
  }, {
    type: 'input',
    name: 'enricher_name',
    message: 'Enricher name:',
    validate: helper.validators.required,
    filter: function(value) {
      return value.replace(/enricher/i, '').trim();
    }
  }, {
    type: 'list',
    name: 'entity_type',
    message: 'Entity type enriched:',
    choices: [
      'org.nuxeo.ecm.core.api.DocumentModel',
      'org.nuxeo.ecm.core.api.NuxeoPrincipal',
      'Other class...'
    ]
  }, {
    type: 'input',
    name: 'entity_type_c',
    message: 'Fully qualified class name:',
    validate: helper.validators.qualified_className,
    when: function(answers) {
      return answers.entity_type === 'Other class...';
    }
  }],
  'main-java': [{
    src: 'enricher.java',
    dest: '{{s.classify(enricher_name)}}Enricher.java'
  }, {
    src: 'jsonWriter.java',
    dest: '{{s.strRightBack(entity_type_c, \'.\')}}JsonWriter.java',
    when: function(answers) {
      return answers.entity_type_c !== undefined && !answers.entity_type_c.startsWith('org.nuxeo.');
    }
  }],
  'test-java': [{
    src: 'test.java',
    dest: '{{s.classify(enricher_name)}}EnricherTest.java'
  }],
  contributions: [{
    src: 'enricher.xml',
    dest: '{{s.dasherize(s.decapitalize(enricher_name))}}-enricher-contrib.xml'
  }],
  dependencies: [
    'org.nuxeo.ecm.core:nuxeo-core-io',
    'org.nuxeo.runtime:nuxeo-runtime-test:::test',
    'org.nuxeo.ecm.core:nuxeo-core-io::test-jar:test',
    'org.nuxeo.ecm.platform:nuxeo-platform-test:::test'
  ]
};
