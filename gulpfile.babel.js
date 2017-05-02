import gulp from 'gulp';
import jasmine from 'gulp-jasmine';
import babel from 'gulp-babel';
// const gulp = require('gulp');

gulp.task('default', ['run-tests']);
gulp.task('run-tests', () => {
  gulp.src('tests/inverted-index-testSpec.js')
        // gulp-jasmine works on filepaths so you can't have any plugins before it
        .pipe(jasmine());
});
