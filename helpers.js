var errors = {
  package: 'Package name must contain at least one "." char and no special chars.',
  artifact: 'Artifact name can\'t be empty and must not contains invalid chars.',
  parent_artifact: 'Parent artifact name must not contain invalid chars.',
  required: 'Field can\'t be empty',
  className: 'Invalid Class name.'
}

var validators = {
  package: function(value) {
    return value.split('.').length > 0 && !value.match(/[^\w\.]/);
  },
  parent_artifact: function(value) {
    var v = (value && value.trim()) || false;
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
  }
}

var filters = {
  package: function(answer) {
    return answer.replace(/\s+/g, '.').toLowerCase();
  }
}

module.exports = (function() {
  var obj = {
    validators: {},
    filters: filters
  };

  // Loop over each validators to bind his error message
  Object.keys(validators).forEach(function(validator) {
    obj.validators[validator] = function(value) {
      return !validators[validator](value) ? (errors[validator] || 'Wrong value.') : true;
    };
  });

  return obj;
})();
