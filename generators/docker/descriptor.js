const helper = require('../../lib/helpers.js');

module.exports = {
  depends: 'default',
  type: 'docker',
  requiredModuleType: 'package',
  order: 100,
  autonomous: true,
  ensure: function () {
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
    message: 'Docker Artifact id:',
    default: function () {
      return global._options.dirname + '-docker';
    },
    validate: helper.validators.artifact
  }, {
    type: 'choice',
    name: 'version',
    message: 'Docker Version:',
    default: '1.0-SNAPSHOT',
    validate: helper.validators.version_snapshot,
    when: function (answers) {
      return !(answers.parent_version && answers.parent_version.match(/-SNAPSHOT$/i));
    }
  }, {
    type: 'input',
    name: 'base_image_repository',
    message: 'Base Docker Image Repository:',
    default: function () {
      return 'docker-private.packages.nuxeo.com/nuxeo/nuxeo';
    }
  }, {
    type: 'input',
    name: 'base_image_version',
    message: 'Base Docker Image Version:',
    default: function () {
      return global._config.get('_nuxeo_version');
    }
  }, {
    type: 'input',
    name: 'studio_package',
    message: 'Studio package to Install:',
    when: helper.studio_package.when,
    default: helper.studio_package.default
  }],
  properties: {
    skipDocker: 'false'
  },
  plugins: [{
    groupId: 'com.spotify',
    artifactId: 'dockerfile-maven-plugin',
    version: '1.4.13',
  }],
};
