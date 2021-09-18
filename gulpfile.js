/**
 * @license
 * Copyright Baidu Inc. All Rights Reserved.
 *
 * This source code is licensed under the Apache License, Version 2.0; found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @file gulpfile
 * @author meijuntao@baidu.com
 */

const path = require('path');
const fs = require('fs-extra');
const {src, watch, dest, series, parallel} = require('gulp');
const gulp = require('gulp');
const cached = require('gulp-cached');
const imagemin = require('gulp-imagemin');
const less = require('gulp-less');
const preprocess = require('gulp-preprocess');
const babel = require('gulp-babel');
const gulpif = require('gulp-if');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const gInstall = require('gulp-install');
const plumber = require('gulp-plumber');

const root = 'src/';
const css = [`${root}**/*.css`, `${root}**/*.less`];
const js = [`${root}**/*.js`];
const img = [`${root}**/*.png`, `${root}**/*.svg`];
const cpSrc = [`${root}**/*.json`, `${root}**/*.swan`, `${root}**/*.css`, `${root}**/*.tpl`, 'package.json'];

/**
 * copy 文件后安装依赖
 * @return {stram}
 */
function install() {
    return gulp.series(
        async () => {
            try {
                const packageObj = await fs.readJson('./package.json');
                const dir = path.parse(path.join(__dirname, './package.json')).dir;
                await fs.ensureDir(dir);
                await fs.writeJson(path.join(__dirname, './dist/package.json'), packageObj);
            } catch (error) {
                console.log(error);
            }
        },
        () => {
            return gulp
                .src(path.join(__dirname, './dist/package.json'), {
                    allowEmpty: true,
                    base: path.join(__dirname, './dist'),
                    cwd: path.join(__dirname, './dist')
                })
                .pipe(gInstall({production: true}));
        }
    );
}

const jsFile = () =>
    src(js)
        // .pipe(cached('jsFile'))
        .pipe(
            preprocess({
                context: {
                    NODE_ENV: process.env.NODE_ENV || 'development'
                }
            })
        )
        .pipe(
            plumber({}, true, function (err) {
                console.log('ERROR!!!!');
                console.log(err);
            })
        )
        .pipe(
            babel({
                presets: ['@babel/env']
            })
        )
        .pipe(
            gulpif(function () {
                return process.env.NODE_ENV === 'production';
            }, uglify())
        )
        .pipe(dest('dist/'));

const copyOtherFile = () => src(cpSrc).pipe(cached('copyFile')).pipe(dest('dist'));

const transformCss = () =>
    src(css)
        .pipe(cached('transformCss'))
        .pipe(less())
        .pipe(
            gulpif(function () {
                return process.env.NODE_ENV === 'production';
            }, cleanCSS())
        )
        .pipe(dest('dist/'));

const tinyImage = () => src(img).pipe(cached('tinyImage')).pipe(imagemin()).pipe(dest('dist/'));

gulp.task('copy', () => src(['package.json']).pipe(cached('copyFile')).pipe(dest('dist')));

gulp.task('install', install());

gulp.task('dev', () => {
    const wathOpts = {
        ignoreInitial: false
    };
    watch(js, wathOpts, jsFile);
    watch(css, wathOpts, transformCss);
    watch(img, wathOpts, tinyImage);
    watch(cpSrc, wathOpts, copyOtherFile);
});
gulp.task('watch', series('copy', 'install', 'dev'));

gulp.task('prod', series('copy', 'install', parallel(jsFile, transformCss, copyOtherFile), tinyImage));
