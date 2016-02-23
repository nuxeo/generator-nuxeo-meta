var errors = {
  package: 'Package name must contains at least one "." char.',
  artifact: 'Artifact name can\'t be empty and must not contains invalid char.',
  required: 'Field can\'t be empty',
  className: 'Invalid Class name.'
}

var validators = {
  package: function(value) {
    return value.split('.').length > 0 && !value.match(/[^\w\.]/);
  },
  artifact: function(value) {
    return value.length > 0 && !value.match(/\W+/);
  },
  required: function(value) {
    return value && value.length > 0;
  },
  className: function(value) {
    return value.length > 1 && value.match(/^[A-Z]/) !== null && !value.match(/\W+/);
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
