const seq = require('async/seq');
const chai = require('chai');
const dirtyChai = require('dirty-chai');
chai.use(dirtyChai);
const expect = chai.expect;
const path = require('path');
const request = require('request');

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
