'use strict';
var fs = require('fs');
var path = require('path');
var chai = require('chai');
var dirtyChai = require('dirty-chai');
chai.use(dirtyChai);
var expect = chai.expect;

describe('Generators', function() {
  describe('descriptor.js', function() {
    it('can be required', function() {
      var generatorsPath = path.join('generators');
      fs.readdirSync(generatorsPath).forEach(function(file) {
        var descPath = path.join(generatorsPath, file, 'descriptor.js');
        if (fs.existsSync(descPath)) {
          require(path.join('..', descPath));
        }
      });
    });
  });

  describe('helper.js', function() {
    before(function() {
      this.helper = require(path.join('..', 'lib', 'helpers.js'));
      this.validators = this.helper.validators;
    });

    it('can validate Java package name', function() {
      var res = this.validators.package('tre.qr®r');
      expect(res).to.be.a('string');
      res = this.validators.package('tre');
      expect(res).to.be.a('string');
      res = this.validators.package('org.nuxeo.');
      expect(res).to.be.a('string');
      res = this.validators.package('org.nuxeo.nuxeo');
      expect(res).to.be.true();
    });

    it('can validate parent artifact id', function() {
      var res = this.validators.parent_artifact('dsa sad sad');
      expect(res).to.be.a('string');
      res = this.validators.parent_artifact('');
      expect(res).to.be.true();
      res = this.validators.parent_artifact(undefined);
      expect(res).to.be.true();
      res = this.validators.parent_artifact('Dasdasdasdsad');
      expect(res).to.be.true();
      res = this.validators.parent_artifact('Dasd-asdasdsad');
      expect(res).to.be.true();
      res = this.validators.parent_artifact('Dasd,asdasdsad');
      expect(res).to.be.a('string');
    });

    it('can validate artifact id', function() {
      var res = this.validators.artifact('dsa sad sad');
      expect(res).to.be.a('string');
      res = this.validators.artifact('');
      expect(res).to.be.a('string');
      res = this.validators.artifact('Dasdasdasdsad');
      expect(res).to.be.true();
      res = this.validators.artifact('Dasd-asdasdsad');
      expect(res).to.be.true();
      res = this.validators.artifact('Dasd,asdasdsad');
      expect(res).to.be.a('string');
    });

    it('can validate required field', function() {
      var res = this.validators.required('');
      expect(res).to.be.a('string');
      res = this.validators.required('dsad');
      expect(res).to.be.true();
    });

    it('can validate class name entry', function() {
      var res = this.validators.className('');
      expect(res).to.be.a('string');
      res = this.validators.className('dsdadsa');
      expect(res).to.be.a('string');
      res = this.validators.className('Ds%dadsa');
      expect(res).to.be.a('string');
      res = this.validators.className('Dsd  adsa');
      expect(res).to.be.a('string');
      res = this.validators.className('DsdAdsa');
      expect(res).to.be.true();
    });

    it('can validate version field', function() {
      // All correct version
      var res = this.validators.version('');
      expect(res).to.be.a('string');
      res = this.validators.version('1.');
      expect(res).to.be.a('string');
      res = this.validators.version('1.a');
      expect(res).to.be.a('string');
      res = this.validators.version('1.a.das');
      expect(res).to.be.a('string');
      res = this.validators.version('1.0');
      expect(res).to.be.true();
      res = this.validators.version('1.0-SNAPSHOT');
      expect(res).to.be.true();

      // Force snapshot version
      res = this.validators.version_snapshot('1.0');
      expect(res).to.be.a('string');
      res = this.validators.version_snapshot('1.a.das-SNAPSHOT');
      expect(res).to.be.a('string');
      res = this.validators.version_snapshot('1.0-SNAPSHOT');
      expect(res).to.be.true();
      res = this.validators.version_snapshot('1.0.0-SNAPSHOT');
      expect(res).to.be.true();
    });

    it('can validate nuxeo package name', function() {
      var res = this.validators.package_name('');
      expect(res).to.be.a('string');
      res = this.validators.package_name('1.');
      expect(res).to.be.a('string');
      res = this.validators.package_name(' dsadasd');
      expect(res).to.be.a('string');
      res = this.validators.package_name('dsadasdsad');
      expect(res).to.be.true();
      res = this.validators.package_name('dsadasd-sad');
      expect(res).to.be.true();
    });
  });
});
