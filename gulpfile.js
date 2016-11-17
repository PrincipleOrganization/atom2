'use strict';

const gulp = require('gulp');

gulp.task('build', () => {
  const dir = './distr';

  gulp.src(['./**/*',
  '!node_modules',
  '!node_modules/**',
  '!Dockerfile',
  '!Dockerfile_x',
  '!flows.json',
  '!storage.json',
  '!templates.json',
  '!test',
  '!test/**',
  '!gulpfile.js',
  '!README.md'])
    .pipe(gulp.dest(dir));
});
