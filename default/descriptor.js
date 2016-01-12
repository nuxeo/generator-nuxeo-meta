module.exports = {
  order: -1,
  depends: 'single-module',
  skipInstall: function() {
    return this.fs.exists('pom.xml');
  }
};
