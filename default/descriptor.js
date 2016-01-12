module.exports = {
  depends: 'single-module',
  skipInstall: function() {
    return this.fs.exists('pom.xml');
  }
};
