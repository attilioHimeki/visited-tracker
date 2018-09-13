'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const csso = require('gulp-csso');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const runSequence = require('run-sequence');
const inject = require('gulp-inject');

const jsFiles = 'src/**/*.js';
const jsDest = 'dist/src';
const cssFiles = 'css/**/*.css';
const cssDest = 'dist/css';
const htmlFiles = './index-inject.htm';
const htmlDist = 'dist/';

gulp.task('scripts', function() {
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('styles', function () {
    return gulp.src(cssFiles)
      .pipe(concat('style.css'))
      .pipe(csso())
      .pipe(gulp.dest(cssDest))
});

gulp.task('pages', function() {
    return gulp.src([htmlFiles])
      .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
      }))
      .pipe(rename('index.htm'))
      .pipe(gulp.dest(htmlDist));
  });

gulp.task('clean', () => del(['dist']));

gulp.task('build', ['clean'], function () {
    runSequence(
      'styles',
      'scripts',
      'pages'
    );
  });