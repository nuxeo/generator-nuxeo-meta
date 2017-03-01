// Simple array containing all samples available in the nuxeo:sample generator.
// Format:
// {
//   name: 'Title displayed to the end user'
//   short: 'Title displayed after selection done; shorter is better.'
//   value: 'github repository',
// }
module.exports = [{
  short: 'Blob Provider',
  name: 'Blob Provider: contains a sample implementation of the BlobProvider interface with a unit test.',
  value: 'michaelva/nuxeo-blobprovider-sample'
}, {
  short: 'ReactJS Application',
  name: 'ReactJS: contains a sampled ReactJS based application to learn development basics, how to deploy and install it inside Nuxeo Server.',
  value: 'nuxeo/reactjs-sample-ui'
}];
