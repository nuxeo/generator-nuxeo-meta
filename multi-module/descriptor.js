module.exports = {
  depends: 'single-module',
  type: "root",
  order: -10,
  skip: function() {
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
    src: function(props) {
      if (props.bom && props.bom.length > 0) {
        return props.bom;
      } else {
        return "pom.xml";
      }
    },
    dest: "pom.xml"
  }]
};
