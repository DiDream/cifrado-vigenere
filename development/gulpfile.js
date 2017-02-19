'use strict'
var
    gulp = require('gulp'),
    browserSync = require('browser-sync'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass');

    gulp.task('sass', () => {
        return gulp.src(`sass/**/*.{scss,sass}`)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(`../css`));
    })
    gulp.task('browserSync', () => {
        browserSync.init({
            server: { baseDir: '..'},
            browser: "firefox" // Indica que navegador se utilizará
        })
    });
    gulp.task('pug', ()=> {
        return gulp.src([`pug/**/*.pug`,`!pug/_partials/**/*.pug` ])
            .pipe(pug({
                pretty: true
            }))
            .pipe(gulp.dest(`..`));
    })

    gulp.task('simple-web',['browserSync'], () => {
        console.log("Iniciando...");
        gulp.watch('sass/**/*.{scss,sass}', ['sass', browserSync.reload]);
        gulp.watch('pug/**/*.pug', ['pug', browserSync.reload]);
        gulp.watch('../js/*.js', browserSync.reload); //watch solo para ficheros .js

    });
