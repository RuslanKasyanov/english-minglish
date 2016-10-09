'use strict'

const gulp = require('gulp'),
    less = require('gulp-less'),
    pug = require('gulp-pug');

gulp.task('less', function () {
    return gulp.src('./front/less/**/*.less')
        .pipe(less({}))
        .pipe(gulp.dest('./public/css'));
});
gulp.task('pug', function () {
    return gulp.src('./views/**/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./public/views'));
});