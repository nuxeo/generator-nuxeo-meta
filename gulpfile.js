'use strict';
var path = require('path');
var gulp = require('gulp');
var fs = require('fs');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var eslint = require('gulp-eslint');
var childProcess = require('child_process');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var plumber = require('gulp-plumber');

var files = ['generators/**/*.js', 'lib/*.js', 'test/**/*.js'];

gulp.task('pre-test', function() {
  return gulp.src(['generators/**/*.js', 'utils/*.js'])
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('watch-test', function() {
  watch(files, batch(function(events, done) {
    gulp.start('test', done);
  }));
});

gulp.task('checkstyle', function() {
  var targetFolder = 'target';
  if (fs.existsSync(targetFolder)) {
    childProcess.execSync('rm -rf ' + targetFolder);
  }
  fs.mkdirSync('target');

  return gulp.src(files)
    .pipe(eslint())
    .pipe(eslint.format('checkstyle', fs.createWriteStream(path.join(targetFolder, '/checkstyle-result.xml'))));
});

gulp.task('lint', ['checkstyle'], function() {
  return gulp.src(files)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test', ['lint', 'pre-test'], function(cb) {
  var mochaErr;

  gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({
      reporter: 'spec'
    }))
    .on('error', function(err) {
      mochaErr = err;
    })
    .pipe(istanbul.writeReports())
    .on('end', function() {
      cb(mochaErr);
    });
});

gulp.task('default', ['test']);
