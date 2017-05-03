import gulp from 'gulp';
import jasmineNode from 'gulp-jasmine-node';
import babel from 'gulp-babel';
// import babel from 'gulp-babel';

gulp.task('transpile', () => {
  return gulp.src('src/inverted-index.js')
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['run-test']);

gulp.task('run-test', ['transpile'], () => {
  return gulp.src(['tests/*Spec.js'])
  .pipe(jasmineNode({
    timeout: 10000
  }));
});
