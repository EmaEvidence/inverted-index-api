import gulp from 'gulp';
import jasmineNode from 'gulp-jasmine-node';
import babel from 'gulp-babel';
import istanbulReport from 'gulp-istanbul-report';
import gulpBabelIstanbul from 'gulp-babel-istanbul';
import coveralls from 'gulp-coveralls';
import injectModules from 'gulp-inject-modules';
import nodemon from 'gulp-nodemon';

gulp.task('transpile', () => {
  return gulp.src(['src/**.js', 'app.js'])
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['transpile', 'coveralls']);

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

gulp.task('coverage', (cb) => {
  gulp.src(['src/inverted-index.js', 'app.js'])
    .pipe(gulpBabelIstanbul())
    .pipe(injectModules())
    .on('finish', () => {
      gulp.src('tests/*.js')
      .pipe(babel())
      .pipe(injectModules())
      .pipe(jasmineNode())
      .pipe(gulpBabelIstanbul.writeReports())
      .pipe(gulpBabelIstanbul.enforceThresholds({ thresholds: { global: 70 } }))
      .on('end', cb);
    });
});

gulp.task('coveralls', ['coverage'], () => {
  if (!process.env.CI) {
    return;
  }
  return gulp.src('./coverage/lcov.info')
    .pipe(coveralls());
});

gulp.task('serve', ['transpile'], () =>
  nodemon({
    script: 'dist/app.js',
    ext: 'js',
    env: { NODE_ENV: process.env.NODE_ENV }
  })
);
