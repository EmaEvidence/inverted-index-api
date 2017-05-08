import gulp from 'gulp';
import jasmineNode from 'gulp-jasmine-node';
import babel from 'gulp-babel';
import istanbul from 'gulp-istanbul';
import istanbulReport from 'gulp-istanbul-report';
import coveralls from 'gulp-coveralls';
import injectModules from 'gulp-inject-modules';
// import codacy from 'gulp-codacy';


gulp.task('transpile', () => {
  return gulp.src('src/**.js')
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['run-test']);

gulp.task('run-test', () => {
  return gulp.src(['tests/*Spec.js'])
  .pipe(jasmineNode({
    timeout: 10000
  }));
});

gulp.task('test', () => {
  gulp.src('./coverage/coverage.json')
    .pipe(istanbulReport());
});

gulp.task('coverage', (e) => {
  gulp.src(['./src/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src(['./tests/*.js'])
        .pipe(injectModules())
        .pipe(jasmineNode())
.pipe(istanbul.writeReports())
.pipe(istanbul.enforceThresholds({ thresholds: { global: 60 } }))
.on('end', e);
    });
});

gulp.task('coveralls', ['test'], () => {
  return gulp.src('./coverage/lcov.info')
    .pipe(coveralls());
});

gulp.task('serve', () => {
});
