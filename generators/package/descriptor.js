const helper = require('../../lib/helpers.js');
const STUDIO_SYMNAME = 'studio:symbolicname';

module.exports = {
  type: 'package',
  depends: 'multi-module',
  autonomous: true,
  ensure: function() {
    return this._isMultiModule();
  },
  params: [{
    type: 'input',
    name: 'parent_package',
    message: 'Parent Group id:',
    store: true,
    validate: helper.validators.package
  }, {
    type: 'input',
    name: 'parent_artifact',
    message: 'Parent Artifact id:',
    store: true,
    validate: helper.validators.artifact
  }, {
    type: 'input',
    name: 'parent_version',
    message: 'Parent version:',
    store: true,
    default: '1.0-SNAPSHOT',
    validate: helper.validators.version
  }, {
    type: 'input',
    name: 'artifact',
    message: 'Package Artifact id:',
    default: function() {
      return global._options.dirname + '-package';
    },
    validate: helper.validators.artifact
  }, {
    type: 'input',
    name: 'version',
    message: 'Package Version:',
    default: '1.0-SNAPSHOT',
    validate: helper.validators.version_snapshot,
    when: function(answers) {
      return !(answers.parent_version && answers.parent_version.match(/-SNAPSHOT$/i));
    }
  }, {
    type: 'input',
    name: 'name',
    message: 'Package name:',
    validate: helper.validators.package_name
  }, {
    type: 'input',
    name: 'company',
    message: 'Company name:'
  }],
  dependencies: 'inherited',
  getTemplatesFolder: function(props) {
    // Return the proper templates folder based on the version
    if (props.v === undefined || props.v.isBefore('8.10')) {
      return 'templates-7.10';
    } else if (props.v.isAfterOrEquals('8.10') && props.v.isBefore('9.10')) {
      return 'templates-8.10';
    } else if (props.v.isAfterOrEquals('9.10') && props.v.isBefore('10.10')) {
      return 'templates-9.10';
    } else if (props.v.isAfterOrEquals('10.10') && props.v.isBefore('11.1')) {
      return 'templates-10.10';
    } else {
      return 'templates-11.1';
    }
  },
  end: function (cb) {
    if (this.config.get(STUDIO_SYMNAME)) {
      this.log.conflict('Please re-run `nuxeo studio link` to properly configure your Studio Project into your package.');
    }
    cb();
  }
};
