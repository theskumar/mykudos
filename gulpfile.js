var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    // jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    // imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    // cache = require('gulp-cache'),
    // livereload = require('gulp-livereload'),
    notify = require('gulp-notify');

gulp.task('styles', function() {
  return gulp.src('styles/mykudos.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'Firefox 20', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    // .pipe(gulp.dest('dist/'))
    .pipe(rename('ku.css'))
    .pipe(minifycss())
    .pipe(gulp.dest('./'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src('scripts/**/*.js')
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('default'))
    .pipe(concat('mykudos.js'))
    // .pipe(gulp.dest('dist/'))
    .pipe(rename('ku.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('watch', function() {
  gulp.watch('styles/**/*.scss', ['styles']);
  gulp.watch('scripts/**/*.js', ['scripts']);
});


gulp.task('clean', function() {
  return gulp.src(['dist/', 'ku.js', 'ku.css'], {read: false})
    .pipe(clean());
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts');
});
