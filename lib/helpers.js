/*eslint camelcase:0*/
'use strict';

var errors = {
  package: 'Value must contain at least one "." char and no special chars.',
  artifact: 'Value can\'t be empty and must only contain alphanumeric chars and dashes.',
  parent_artifact: 'Value must only contain alphanumeric chars and dashes.',
  required: 'Value can\'t be empty.',
  className: 'Invalid class name.',
  version_snapshot: 'Version must match pattern (X.)Y.Z-SNAPSHOT (X, Y and Z being numbers)',
  version: 'Version must match pattern (X.)Y.Z(-QUALIFIER) (X, Y and Z being numbers)',
  package_name: 'Value must only contain letters, numbers, spaces or dashes.'
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
    return value.length > 0 && !value.match(/[^\w-]/);
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
    return value.length > 0 && !value.match(/[^\d\w-\s]/);
  }
};

var filters = {
  package: function(answer) {
    return answer.trim().replace(/\s+/g, '.').toLowerCase();
  },
  package_name: function(answer) {
    return answer.trim().replace(/\s+/g, ' ').toLowerCase();
  }
};

var nuxeo_version = {
  choices: [
    '7.10 (LTS 2015)',
    '8.1',
    '8.2 (latest FastTrack)',
    '8.3-SNAPSHOT'
  ],
  default: '8.2',
  default_distribution: '8.2',
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
