"use strict";

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');  // bundle JS
var reactify = require('reactify');  // transform JSX to JS
var source = require('vinyl-source-stream');  // use conventional text streams with gulp
var concat = require('gulp-concat');  // concat files
var lint = require('gulp-eslint');
var sass = require('gulp-sass');
var flatten = require('gulp-flatten');
 var gls = require('gulp-live-server');


var config = {
  paths : {
    html: './src/*.html',
    js : './src/**/*.js*',
    styles : [
      './node_modules/weather-icons/css/weather-icons.min.css',
      './node_modules/emojione/lib/emojione-awesome/emojione-awesome.scss',
      './src/**/*.scss',
    ],
    images : './src/images/*',
    fonts : [
      './src/fonts/*',
      './node_modules/weather-icons/font/weathericons-regular-webfont.woff'
    ],
    dist: './dist',
    mainJs : './src/app.jsx'
  }
}

gulp.task('serve', function() {
  var server = gls('./src/server.js');
  server.start();
  gulp.watch(['./dist/**/bundle.*'], function(file) {
    server.notify.apply(server, [file]);
  });
  gulp.watch(['./src/**/*.js'], function() {
    console.log('... restarting');
    server.start.bind(server)();
  });
});


gulp.task('html', function() {
  gulp
  .src(config.paths.html)
  .pipe(gulp.dest(config.paths.dist))
});

gulp.task('js', function() {
  browserify(config.paths.mainJs)
    .transform(reactify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
});

gulp.task('css', function() {
  gulp
  .src(config.paths.styles)
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(flatten())
  .pipe(concat('bundle.css'))
  .pipe(gulp.dest(config.paths.dist + '/css'))
});

/*
gulp.task('images', function() {
  gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist + '/images'))
    .pipe(connect.reload());

  gulp.src('./src/favicon.ico')
    .pipe(gulp.dest(config.paths.dist))
});
*/


gulp.task('fonts', function() {
  gulp
  .src(config.paths.fonts)
  .pipe(gulp.dest(config.paths.dist + '/font'))
});

gulp.task('lint', function() {
  return gulp.src(config.paths.js)
    .pipe(lint({ configFile : 'eslint.config.json'}))
    .pipe(lint.format());
});

gulp.task('watch', function() {
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js', 'lint']);
  gulp.watch(config.paths.styles, ['css']);
});

gulp.task('default', ['html', 'js', 'css', 'fonts', 'lint', 'serve', 'watch']);