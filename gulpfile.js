const gulp = require('gulp'),

      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      gulpStylelint = require('gulp-stylelint'),

      uglify = require('gulp-uglify-es').default,
      babel = require('gulp-babel'),
      jshint = require('gulp-jshint'),
      concat = require('gulp-concat'),

      browserSync = require('browser-sync').create(),
      rename = require("gulp-rename"),
      del = require('del'),

      imagemin = require('gulp-imagemin'),
      pngquant = require('imagemin-pngquant'),
      cache = require('gulp-cache');

gulp.task('style', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(gulpStylelint({
            reporters: [
                {
                    formatter: 'string',
                    console: true
                }
            ]
        }))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
})

gulp.task('lintJS', function () {
    return gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(browserSync.stream());
})

gulp.task('img', function () {
    return gulp.src('./img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    gulp.watch('./scss/**/*.scss', gulp.parallel('style'));
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/*.js', gulp.parallel('lintJS'));
})

gulp.task('removedist', function (done) {
    del.sync('dist');
    done();
})

gulp.task('buildLibs', function () {
    return gulp.src('./libs/**/*.*',)
        .pipe(gulp.dest('dist/libs'));
});

gulp.task('prebuild', async function () {

    var buildCss = gulp.src('./css/style.css')
        .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('./fonts/*')
        .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('./js/*')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('*.html')
        .pipe(gulp.dest('dist'));

});

gulp.task('build', gulp.parallel('removedist', 'style','img', 'buildLibs',  'prebuild'));
