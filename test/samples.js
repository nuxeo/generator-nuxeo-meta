var seq = require('async/seq');
var chai = require('chai');
var dirtyChai = require('dirty-chai');
chai.use(dirtyChai);
var expect = chai.expect;
var path = require('path');
var request = require('request');

describe('Samples', function() {
  this.timeout(30 * 1000);

  describe('samples.js', function() {

    before(function(done) {
      this.samples = require(path.join('..', 'samples', 'samples.js'));

      require('dns').resolve('www.github.com', (errco) => {
        expect(errco).to.not.exist();
        done();
      });
    });

    it('can be parsed', function() {
      expect(this.samples).to.be.exist();
    });

    it('contains only valid repository', function(done) {
      let validators = [];

      this.samples.forEach((sample) => {

        validators.push((callback) => {
          request.get(`https://www.github.com/${sample.value}`,
            function(error, response) {
              if (!error && response.statusCode !== 200) {
                error = Error(`Cannot access to ${sample.value}; HTTP status: ${response.statusCode}`);
              }
              callback(error);
            });
        });
      });

      seq.apply(this, validators)((error) => {
        done(error);
      });
    });
  });
});
