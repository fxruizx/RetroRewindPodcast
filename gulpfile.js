'use strict';

var gulp = require('gulp'),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    sass = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    tinyimg = require("gulp-tinify");
    
var myDistpath = 'user/themes/rrp-v4';

gulp.task('concatScripts', function(){
    return gulp.src(['src/js/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(myDistpath+'/js'));
});

gulp.task("minifyScripts", ['concatScripts'], function(){
    return gulp.src(myDistpath+'/js/app.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest(myDistpath+'/js'));
    
});

gulp.task('compileSass', function(){
    return gulp.src('src/scss/application.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [ '/usr/local/rvm/gems/ruby-2.3.0/gems/susy-2.2.12/sass' ]
        }).on('error', sass.logError))
        .pipe(rename('styles.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(myDistpath+'/css'));
});

gulp.task('compressSass', function(){
    return gulp.src('src/scss/application.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest(myDistpath+'/css'));
});

gulp.task('compressImg', function() {
    gulp.src('user/pages/episodes/**/*.png', { base: '.' })
        .pipe(tinyimg('TNqhCLKdC-vm8ZuIk7IHkBEAkrgZlCgi'))
        .pipe(gulp.dest('user/pages/episodes/'));
});

gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', ['compileSass']);
    gulp.watch('src/js/**/*.js', ['concatScripts']);
})

gulp.task('build', ['minifyScripts', 'compressSass'], function(){
    return gulp.src(['src/css/styles.css', 'src/js/app.min.js', 'src/*.html'], { base: './src'})
        .pipe(gulp.dest(myDistpath+'/dist'));
});


gulp.task('default', ['minifyScripts', 'compressSass'], function(){
    console.log("Scripts and CSS minified");
});