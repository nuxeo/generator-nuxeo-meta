/*eslint camelcase:0*/
'use strict';

var errors = {
  package: 'Package name must contain at least one "." char and no special chars.',
  artifact: 'Artifact name can\'t be empty and must not contain special chars.',
  parent_artifact: 'Parent artifact name must not contain special chars.',
  required: 'Field can\'t be empty',
  className: 'Invalid class name.',
  version_snapshot: 'Version must match pattern (X.)Y.Z-SNAPSHOT (X, Y and Z being numbers)',
  version: 'Version must match pattern (X.)Y.Z(-IDENTIFIER) (X, Y and Z being numbers)',
  package_name: 'Package name contains special chars.'
};

var validators = {
  package: function(value) {
    return value.split('.').length > 1 && !value.match(/^\./) && !value.match(/\.$/) && !value.match(/[^\w\.]/);
  },
  parent_artifact: function(value) {
    var v = value && value.trim() || false;
    return !v || !value.match(/[^\w-]/);
  },
  artifact: function(value) {
    return value.length > 0 && !value.match(/[^\w-]/) && !value.match(/\d+/);
  },
  required: function(value) {
    return value && value.length > 0;
  },
  className: function(value) {
    return value.length > 1 && value.match(/^[A-Z]/) !== null && !value.match(/[^\w]/);
  },
  version: function(value) {
    return value && value.length > 1 && value.match(/^(\d+\.)?(\d+\.)(\*|\d+)(-\w+)?$/);
  },
  version_snapshot: function(value) {
    return value && value.length > 1 && value.match(/^(\d+\.)?(\d+\.)(\*|\d+)-SNAPSHOT$/);
  },
  package_name: function(value) {
    return value.length > 0 && !value.match(/[^\w-\s]/) && !value.match(/\d+/);
  }
};

var filters = {
  package: function(answer) {
    return answer.replace(/\s+/g, '.').toLowerCase();
  },
  package_name: function(answer) {
    return answer.replace(/\s+/g, ' ').toLowerCase().trim();
  }
};

var nuxeo_version = {
  choices: [
    '7.10 (LTS 2015)',
    '8.1 (latest FastTrack)',
    '8.2-SNAPSHOT'
  ],
  default: '8.2-SNAPSHOT',
  default_distribution: '8.1',
  filter: function(answer) {
    // Strip text between parenthesis
    return answer.replace(/\s+?\(.+\)/g, '');
  }
};

module.exports = (function() {
  var obj = {
    validators: {},
    filters: filters,
    nuxeo_version: nuxeo_version
  };

  // Loop over each validators to bind his error message
  Object.keys(validators).forEach(function(validator) {
    obj.validators[validator] = function(value) {
      return !validators[validator](value) ? errors[validator] || 'Wrong value.' : true;
    };
  });

  return obj;
})();
