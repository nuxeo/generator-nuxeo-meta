// Descriptor skeleton
module.exports = {
  // Parent module to install if needed, parent is also checked at install
  // time to ensure the there is no conflict.
  depends: 'default',
  // Return a boolean to skip the generator installation
  skip: function() {},
  type: 'core|web|ftest|xxx',
  // Global configuration to save
  // value can be function / litteral / or {{template}}
  config: {},
  // List of params following yeoman documentation
  params: [],
  // Helper for java Classes (package need to exists in path)
  // Files need to be in 'classes' folder
  'main-java': [{
    src: 'template class',
    dest: 'destination filename',
    when: function(answers) {
      return answers.res === 'ok'; // Filter some classes generation
    }
  }],
  'test-java': [{
    src: 'template class',
    dest: 'destination filename',
    when: function(answers) {
      return answers.res === 'ok'; // Filter some test classes generation
    }
  }],
  // Maven dependency to ensure exists / add -> GAV format
  dependencies: [],
  // Contribution to add to the MANIFEST / COPY
  contributions: [{
    src: 'local filename',
    dest: 'destination filename'
  }]
};
