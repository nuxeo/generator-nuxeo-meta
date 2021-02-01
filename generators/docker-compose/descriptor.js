module.exports = {
  description: 'Default Docker Compose file',
  depends: 'default',
  order: 500,
  requiredModuleType: 'docker',
  autonomous: true,
  type: 'root',
  skip: function () {
    // Skip if docker-compose file already exist
    return this.fs.exists('docker-compose.yml');
  },
  params: []
};
