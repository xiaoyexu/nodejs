var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var reactify = require('reactify')
var source = require('vinyl-source-stream');
gulp.task('default', function () {
 return browserify('app.js')
 .transform(reactify)
 .bundle()
 .pipe(source('app.js'))
 .pipe(gulp.dest('./build/'));
});