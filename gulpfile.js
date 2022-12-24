'use strict';

const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const minify = require('gulp-minify');

// import gulp from 'gulp';
// import cssmin from 'gulp-cssmin';
// import sass from 'gulp-sass';
// import rename from 'gulp-rename';
// import minify from 'gulp-minify';


function sassToCss() {
    return gulp.src('./src/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./public'));
}

function minifyJS() {
    return gulp.src('./src/scripts/main.js')
        .pipe(minify({
            ext:{
                src:'.js',
                min:'.min.js'
            },
            noSource: true
        }))
        .pipe(gulp.dest('./public'))
}

exports.sass = sassToCss;
exports.js = minifyJS;

exports.watch = function () {
    gulp.watch(['./src/styles/*.scss', './src/scripts/*.js', "./fonts/*.scss"], gulp.parallel('sass', 'js'));
};
