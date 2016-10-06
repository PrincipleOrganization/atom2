'use strict';

const gulp = require('gulp');

gulp.task('build', () => {
  const dir = './distr';

  gulp.src(['./**/*', '!node_modules',
  '!node_modules/**',
  '!Dockerfile',
  '!flows.json',
  '!gulpfile.js',
  '!README.md'])
    .pipe(gulp.dest(dir));
});
