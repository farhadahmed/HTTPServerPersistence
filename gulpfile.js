var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

gulp.task('jshint', function() {
  return gulp.src(['./lib/notes/*.js', './test/*.js'])
             .pipe(jshint())
             .pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
  return gulp.src('test/*.js')
             .pipe(mocha( { reporter: 'nyan' } ));
});
