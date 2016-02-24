var helper = require('../helpers.js');

// Fake Inquirer Separator / with chalk
// See: https://github.com/SBoudrias/Inquirer.js/blob/master/lib/objects/separator.js
var Separator = function(line) {
  this.type = 'separator';
  this.line = ' > \u001b[90m' + line.trim() + '\u001b[22m\u001b[39m';
}

module.exports = {
  depends: 'default',
  params: [{
    type: 'input',
    name: 'listener_name',
    message: 'Listener class name:',
    validate: helper.validators.className
  }, {
    type: 'input',
    name: 'package',
    message: 'Listener package:',
    store: true,
    validate: helper.validators.package
  }, {
    type: 'checkbox',
    name: 'events',
    message: 'Trigger on events:',
    choices: [
      new Separator('Document lifecycle events: '), {
        name: 'emptyDocumentModelCreated'
      }, {
        name: 'aboutToCreate'
      }, {
        name: 'documentCreated'
      }, {
        name: 'beforeDocumentModification'
      }, {
        name: 'documentModified'
      }, {
        name: 'aboutToRemove'
      }, {
        name: 'documentRemoved'
      },
      new Separator('Document action events: '), {
        name: 'aboutToCopy'
      }, {
        name: 'documentCreatedByCopy'
      }, {
        name: 'aboutToMove'
      }, {
        name: 'documentMoved'
      }, {
        name: 'documentLocked'
      }, {
        name: 'documentUnlocked'
      },
      new Separator('Version action events: '), {
        name: 'aboutToRemoveVersion'
      }, {
        name: 'versionRemoved'
      }, {
        name: 'aboutToRemoveVersion'
      }, {
        name: 'aboutToRemoveVersion'
      },
      new Separator('Custom events: '), {
        name: 'Add custom events'
      }
    ],
    validate: function(value) {
      return value.length > 0 ? true : 'Selected events should not be empty.';
    }
  }, {
    type: 'input',
    name: 'custom_events',
    message: 'Custom Events (separate with a comma):',
    validate: function(value) {
      return value.trim().length === 0 || value.match(/[^,\w\s]/) ? 'Invalid input, and use a comma to separate custom events.' : true;
    },
    when: function(answers) {
      var i = answers.events.indexOf('Add custom events');
      if (i >= 0) {
        // Remove custom events entry
        answers.events.splice(i, 1);
        return true;
      } else {
        // Add default value...
        answers.custom_events = [];
      }
    },
    filter: function(value) {
      return value.trim().toLowerCase().replace(/^,+|\s+|,+$/g, '').replace(/,+/g, ',').split(/,\s*/);
    }
  }, {
    type: 'confirm',
    name: 'async',
    message: 'Is it an asynchronous Listener?',
    default: false
  }, {
    type: 'confirm',
    name: 'post_commit',
    message: 'Is it a post-commit Listener?',
    default: false,
    when: function(answers) {
      return !answers.aync;
    }
  }],
  'main-java': [{
    src: 'listener.java',
    dest: '{{s.camelize(listener_name)}}.java'
  }],
  'test-java': [{
    src: 'test.java',
    dest: 'Test{{s.camelize(listener_name)}}.java'
  }],
  contributions: [{
    src: 'listeners.xml',
    dest: '{{s.dasherize(s.decapitalize(listener_name))}}-listener-contrib.xml'
  }],
  dependencies: [
    "org.nuxeo.runtime:nuxeo-runtime-test:::test",
    "org.nuxeo.ecm.platform:nuxeo-platform-test:::test",
    "org.nuxeo.ecm.core:nuxeo-core-event"
  ]
}
