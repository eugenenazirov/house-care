'use strict';

const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');

function sassToCss() {
  return gulp.src('./src/styles/main.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(cssmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./public'));
}

exports.sass = sassToCss;

exports.watch = function () {
  gulp.watch('./src/styles/*.scss', gulp.series('sass'));
};
