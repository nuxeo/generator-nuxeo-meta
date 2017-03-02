/*eslint camelcase:0*/
var path = require('path');

var errors = {
  package: 'Value must contain at least one "." char and no special chars.',
  artifact: 'Value can\'t be empty and must only contain alphanumeric chars and dashes.',
  parent_artifact: 'Value must only contain alphanumeric chars and dashes.',
  required: 'Value can\'t be empty.',
  only_chars: 'Value must only contain alphanumeric chars.',
  className: 'Invalid class name.',
  qualified_className: 'Qualified class name should looks like to: org.bigcorps.class.MyClass.',
  version_snapshot: 'Version must match pattern (X.)Y.Z-SNAPSHOT (X, Y and Z being numbers)',
  version: 'Version must match pattern (X.)Y.Z(-QUALIFIER) (X, Y and Z being numbers)',
  package_name: 'Value must only contain letters, numbers, spaces or dashes.',
  route: 'Value must only contain alphanumeric chars and dashes.'
};

var validators = {
  package: function(value) {
    return value.split('.').length > 1 && !value.match(/\.{2,}/) && !value.match(/^\./) && !value.match(/\.$/) && !value.match(/[^\w\.]/);
  },
  parent_artifact: function(value) {
    var v = value && value.trim() || false;
    return !v || !value.match(/[^\w-]/);
  },
  artifact: function(value) {
    return value && value.length > 0 && !value.match(/[^\w-]/);
  },
  required: function(value) {
    return value && value.length > 0;
  },
  className: function(value) {
    return value.length > 1 && value.match(/^[A-Z]/) !== null && !value.match(/[^\w]/);
  },
  qualified_className: function(value) {
    var lastDot = value.lastIndexOf('.');
    var packageName = value.substring(0, lastDot);
    var className = value.substring(lastDot + 1);
    return this.package(packageName) && this.className(className);
  },
  version: function(value) {
    return value && value.length > 1 && value.match(/^(\d+\.)?(\d+\.)(\*|\d+)(-\w+)?$/);
  },
  version_snapshot: function(value) {
    return value && value.length > 1 && value.match(/^(\d+\.)?(\d+\.)(\*|\d+)-SNAPSHOT$/);
  },
  package_name: function(value) {
    return value.length > 0 && !value.match(/[^\d\w-\s]/);
  },
  route: function(value) {
    return this.parent_artifact(value);
  },
  only_chars: function(value) {
    var v = value && value.trim() || false;
    return !v || !value.match(/[^\w]/);
  }
};

var filters = {
  package: function(answer) {
    return answer.trim().replace(/\s+/g, '.').toLowerCase();
  },
  package_name: function(answer) {
    return answer.trim().replace(/\s+/g, ' ').toLowerCase();
  },
  action_bean: function(answer) {
    return answer.trim().replace(/[Aa]ctions?[Bb]eans?$/, '');
  }
};

var skips = {
  not_empty_project: function(type) {
    var pom = path.join(this._getBaseFolderName(type), 'pom.xml');
    return this.fs.exists(pom);
  }
};

var nuxeo_version = (function() {
  var targetPlatforms = global.NUXEO_VERSIONS || {};

  function cleanName(name) {
    var txt = name || '';
    return txt.replace(/\s+?\(.+\)/g, '');
  }

  return {
    choices: targetPlatforms.choices,
    default: targetPlatforms.default,
    default_distribution: cleanName(targetPlatforms.default),
    filter: cleanName
  };
})();

module.exports = (function() {
  var obj = {
    validators: {},
    filters: filters,
    nuxeo_version: nuxeo_version,
    skips: skips
  };

  // Loop over each validators to bind his error message
  Object.keys(validators).forEach(function(validator) {
    obj.validators[validator] = function(value) {
      return !validators[validator](value) ? errors[validator] || 'Wrong value.' : true;
    };
  });

  return obj;
})();
