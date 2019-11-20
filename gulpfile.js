const gulp = require('gulp');
const concat = require('gulp-concat');
const pug = require('gulp-pug');
const prefix = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const notify = require('gulp-notify');
const zip = require('gulp-zip');

gulp.task('html', function(){
    return gulp.src('./project/pug/main.pug')
    .pipe(pug({pretty:true}))
    .pipe(concat('index.html'))
    .pipe(gulp.dest('./dist'))
    .pipe(notify('HTML TASK IS DONE'))
})
gulp.task('css', function(){
    return gulp.src('./project/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle:"compressed"}))
    .pipe(prefix('last 2 versions'))
    .pipe(concat('index.css'))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('./dist'))
    .pipe(notify('CSS TASK IS DONE'))
})
gulp.task('js',function(){
    return gulp.src('./project/js/*.js')
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
    .pipe(notify('JAVASCRIPT TASK IS DONE'))
})

gulp.task('watch', function(){
    require('./server');
    gulp.watch('./project/pug/**/*.pug', gulp.series('html'));
    gulp.watch('./project/sass/**/*.scss', gulp.series('css'));
    gulp.watch('./project/js/**/*.js', gulp.series('js'));
    gulp.watch('./dist/**/*.*', gulp.series('compressed'));
})