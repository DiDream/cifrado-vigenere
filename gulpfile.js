'use strict'
var
    gulp = require('gulp'),
    browserSync = require('browser-sync'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass');

    gulp.task('sass', () => {
        return gulp.src(`sass/**/*.{scss,sass}`)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(`app/css`));
    })
    gulp.task('browserSync', () => {
        browserSync.init({
            server: { baseDir: 'app'},
            browser: "firefox" // Indica que navegador se utilizará
        })
    });
    gulp.task('pug', ()=> {
        return gulp.src([`pug/**/*.pug`,`!pug/_partials/**/*.pug` ])
            .pipe(pug({
                pretty: true
            }))
            .pipe(gulp.dest(`app`));
    })

    gulp.task('simple-web',['browserSync'], () => {
        console.log("Iniciando...");
        gulp.watch(`sass/**/*.{scss,sass}`, ['sass', browserSync.reload]);
        gulp.watch(`pug/**/*.pug`, ['pug', browserSync.reload]);
        // gulp.watch(folder + '/app/**/*.{html,css,js}', browserSync.reload);

    });
