module.exports = {
  depends: 'single-module',
  type: "root",
  order: -10,
  skipInstall: function() {
    return this.fs.exists('pom.xml');
  },
  before: function() {
    this.config.set('multi', true);
  },
  params: [{
    type: 'input',
    name: 'bom',
    message: 'BOM path:'
  }],
  templates: [{
    src: function() {
      if (this.props.bom && this.props.bom.length > 0) {
        return this.props.bom;
      } else {
        return "pom.xml";
      }
    },
    dest: "pom.xml"
  }]
};
