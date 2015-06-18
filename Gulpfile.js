'use strict';

var gulp       = require('gulp');
var del        = require('del');
var path       = require('path');
var browserify = require('browserify');
var reactify   = require('reactify');
var watchify   = require('watchify');
var uglify     = require('gulp-uglify');
var less       = require('gulp-less');
var minifyCSS  = require('gulp-minify-css');
var source     = require('vinyl-source-stream');
var $          = require('gulp-load-plugins')();

var prod = $.util.env.prod;

// gulp-plumber for error handling
function onError() {
    /* jshint ignore:start */
    var args = Array.prototype.slice.call(arguments);
    $.util.beep();
    $.notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
    }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
    /* jshint ignore:end */
}


// Styles
gulp.task('styles', function() {
    return gulp.src('styles/movie-finder.less')
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe(less({paths: [ path.join(__dirname, 'styles') ],
            sourceMap:true,
            sourceMapBasepath:__dirname,
            sourceMapRootpath:'/'}))
        .pipe($.autoprefixer('last 3 versions'))
        .pipe(minifyCSS({keepBreaks:false}))
        .pipe(gulp.dest('public/styles'))
        .pipe($.size());
});


// Scripts
gulp.task('scripts', ['clean'], function() {
    var bundler;
    bundler = browserify({
        basedir: __dirname,
        noparse: ['react/addons', 'reflux', 'fastclick', 'react-router'],
        entries: ['./src/app.jsx'],
        transform: [reactify],
        extensions: ['.jsx'],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    });

    bundler = watchify(bundler);

    function rebundle() {
        console.log('Bundling Scripts...');
        var start = Date.now();
        return bundler.bundle()
            .on('error', onError)
            .pipe(source('bundle.js'))
            .pipe($.util.noop())
            .pipe(gulp.dest('public/scripts'))
            .pipe($.notify(function() {
                console.log('Bundling Complete - ' + (Date.now() - start) + 'ms');
            }));
    }

    bundler.on('update', rebundle);

    return rebundle();
});


// Prod Scripts (no watchify)
gulp.task('prodscripts', ['clean'], function() {
    var bundler;
    bundler = browserify({
        basedir: __dirname,
        noparse: ['react/addons', 'reflux', 'fastclick', 'react-router'],
        entries: ['./src/app.jsx'],
        transform: [reactify],
        extensions: ['.jsx'],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    });

    function rebundle() {
        console.log('Bundling Scripts...');
        var start = Date.now();
        return bundler.bundle()
            .on('error', onError)
            .pipe(source('bundle.js'))
            .pipe($.streamify($.uglify()))
            .pipe(gulp.dest('public/scripts'))
            .pipe($.notify(function() {
                console.log('Bundling Complete - ' + (Date.now() - start) + 'ms');
            }));
    }

    return rebundle();
});


// HTML
gulp.task('html', ['clean'], function() {
    return gulp.src('src/*.html')
        .pipe($.useref())
        .pipe(gulp.dest('public'))
        .pipe($.size());
});


// TXT
gulp.task('txt', ['clean'], function() {
    return gulp.src('src/*.txt')
        .pipe($.useref())
        .pipe(gulp.dest('public'))
        .pipe($.size());
});


// Images
gulp.task('images', ['clean'], function() {
    return gulp.src('assests/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('public/images'))
        .pipe($.size());
});


// Local Webserver
gulp.task('serve', function() {
    gulp.src('public')
        .pipe($.webserver({
            livereload: true,
            port: 4444,
            fallback: 'index.html'
        }));
});


// Clean
gulp.task('clean', function(cb) {
    del(['public/*.*', 'public/styles', 'public/scripts', 'public/images'], cb);
});


// Default task
gulp.task('default', ['html', 'txt', 'styles', 'prodscripts', 'images']);


// Watch
gulp.task('watch', ['html', 'styles', 'scripts', 'images', 'serve'], function() {
    gulp.watch('src/*.html', ['html']);
    gulp.watch('styles/**/*.less', ['styles']);
    gulp.watch('assests/images/**/*', ['images']);
});