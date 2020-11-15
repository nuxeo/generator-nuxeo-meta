const MODULE_IGNORED = 'module:ignored';
const STUDIO_SYMNAME = 'studio:symbolicname';

module.exports = {
  description: 'Your project devcontainer folder',
  depends: 'default',
  autonomous: true,
  type: 'root',
  requiredModuleType: ['package', 'docker'],
  skip: function () {
    // Check first if the devcontainer has already been configured
    let skip = this.fs.exists('.devcontainer/devcontainer.json');
    if (skip) {
      this.log.error('The devcontainer is already configured');
    } else {
      // Then check if the studio link has been ran already
      skip = this.config.get(STUDIO_SYMNAME) === undefined;
      if (skip) {
        this.log.error('The Studio project has not been linked yet.');
        this.log.error(`Run \`${this.options.$0} studio link\` first.`);
      }
    }
    return skip;
  },
  params: [{
    type: 'checkbox',
    name: 'ignoredModules',
    message: 'Ignore selected modules:',
    choices: () => {
      const modules = global.MODULES_HELPER.listModules(global._options.env.cwd);
      return global.MODULES_HELPER.modulesToChoices(modules);
    },
    store: true,
    when: () => {
      // Check if the ignored modules have been already configured
      const modules = global._config.get(MODULE_IGNORED);
      return modules === undefined;
    }
  }, {
    type: 'input',
    name: 'username',
    message: 'NOS Username:',
    store: true,
    validate: (input) => {
      return input && input.length > 0 || 'Username is empty';
    }
  }, {
    type: 'password',
    name: 'password',
    message: 'NOS Token:',
    validate: (input) => {
      return input && input.length > 0 || 'Token is empty';
    }
  }, {
    type: 'input',
    name: 'project',
    message: 'Studio Project:',
    default: global._config.get(STUDIO_SYMNAME),
    validate: (input) => {
      return input && input.length > 0 || 'Studio Project is empty';
    }
  }, {
    type: 'input',
    name: 'nexusUser',
    message: 'Nexus Username:',
    store: true,
    validate: (input) => {
      return input && input.length > 0 || 'Username is empty';
    }
  }, {
    type: 'password',
    name: 'nexusToken',
    message: 'Nexus Token:',
    store: true,
    validate: (input) => {
      return input && input.length > 0 || 'Username is empty';
    }
  }],
  end: function (cb) {
    // If the docker image has not been built yet, display a warning to the user
    if (!this.fs.exists(`${this.options.dirname}-docker/target/docker/image-id`)) {
      this.log.conflict(`Please make sure the docker image has been built before running the devcontainer`);
    }
    cb();
  }
}