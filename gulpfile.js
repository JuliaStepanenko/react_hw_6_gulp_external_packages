'use strict';

const { src, dest, watch, series, parallel } = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();

function scssConvertCss(){
    return src('src/scss/index.scss')
        .pipe(sass())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('prod/css/'))
        .pipe(browserSync.stream());
}

function pugConvertHtml(){
    return src('src/index.pug')
        .pipe(pug({
            pretty:true
        }))
        .pipe(dest('prod/'))
        .pipe(browserSync.stream());
}

function development(){
    browserSync.init({
        server: "prod/"
    });

    watch('src/scss/index.scss',scssConvertCss);
    watch('src/*.pug',pugConvertHtml);
}

exports.default = development;
