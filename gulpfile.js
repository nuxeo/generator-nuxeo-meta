const path = require('path');
const gulp = require('gulp');
const fs = require('fs');
const watch = require('gulp-watch');
const batch = require('gulp-batch');
const eslint = require('gulp-eslint');
const childProcess = require('child_process');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const plumber = require('gulp-plumber');
const nsp = require('gulp-nsp');

const files = ['generators/**/*.js', '!generators/*/templates/**/*.js', 'lib/*.js', 'test/**/*.js'];

gulp.task('pre-test', function() {
  return gulp.src(['lib/*.js'])
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
  const targetFolder = 'target';
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

gulp.task('prepublish', ['nsp', 'test']);

gulp.task('nsp', function(done) {
  nsp({
    shrinkwrap: __dirname + '/npm-shrinkwrap.json',
    package: __dirname + '/package.json'
  }, done);
});
;
gulp.task('test', ['lint', 'pre-test'], function(cb) {
  let mochaErr;

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
