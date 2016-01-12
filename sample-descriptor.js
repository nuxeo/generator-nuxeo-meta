// Descriptor skeleton
module.exports = {
  // Parent module to install if needed, parent is also checked at install
  // time to ensure the there is no conflict.
  depends: "default",
  // Return a boolean to skip the generator installation
  skip: function() { },
  type: "core|web|ftest",
  // Do some job before starting to ask params
  before: function() { },
  // List of params following yeoman documentation
  params: [],
  // Void function before starting generation (init context)
  beforeGeneration: function() { },
  // Templates to render
  templates: [{
    src: "local path",
    dest: "destination path"
  }],
  // Maven dependency to ensure exists / add -> GAV format
  dependencies: [],
  // Contribution to add to the MANIFEST / COPY
  contributions: []
}
