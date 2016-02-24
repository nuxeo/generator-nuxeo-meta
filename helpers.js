var errors = {
  package: 'Package name must contain at least one "." char and no special chars.',
  artifact: 'Artifact name can\'t be empty and must not contain invalid chars.',
  parent_artifact: 'Parent artifact name must not contain invalid chars.',
  required: 'Field can\'t be empty',
  className: 'Invalid class name.',
  version_snapshot: 'Version must match pattern (X.)Y.Z-SNAPSHOT (X, Y and Z being numbers)',
  version: 'Version must match pattern (X.)Y.Z(-IDENTIFIER) (X, Y and Z being numbers)',
  package_name: 'Package name contains invalid chars.'
};

var validators = {
  package: function(value) {
    return value.split('.').length > 1 && !value.match(/^\./) && !value.match(/\.$/) && !value.match(/[^\w\.]/);
  },
  parent_artifact: function(value) {
    var v = (value && value.trim()) || false;
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
    return value.length > 1 && value.match(/^(\d+\.)?(\d+\.)(\*|\d+)(-\w+)?$/);
  },
  version_snapshot: function(value) {
    return value.length > 1 && value.match(/^(\d+\.)?(\d+\.)(\*|\d+)-SNAPSHOT$/);
  },
  package_name: function(value) {
    return value.length > 0 && !value.match(/[^\w-]/) && !value.match(/\d+/);
  }
};

var filters = {
  package: function(answer) {
    return answer.replace(/\s+/g, '.').toLowerCase();
  }
};

module.exports = (function() {
  var obj = {
    validators: {},
    filters: filters,
    nuxeo_version: '8.2-SNAPSHOT'
  };

  // Loop over each validators to bind his error message
  Object.keys(validators).forEach(function(validator) {
    obj.validators[validator] = function(value) {
      return !validators[validator](value) ? (errors[validator] || 'Wrong value.') : true;
    };
  });

  return obj;
})();