const
    gulp = require('gulp'),
    nunjucksRender = require('gulp-nunjucks-render');
sass = require('gulp-sass');
browserSync = require('browser-sync').create();
cleanCSS = require('gulp-clean-css');


gulp.task('sass', function () {
    gulp.src('./src/**/main.scss')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});
const htmlMain = gulp.task('html', () =>
    gulp.src("./src/core/index.html")
        .pipe(nunjucksRender())
        .pipe(gulp.dest("./dist"))
);
gulp.task('sass', function () {
    return gulp.src('./src/core/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});
gulp.task('default', ['browserSync', 'sass', 'html'], function () {
    gulp.watch('./src/**/*.scss', ['sass']);
    gulp.watch("./src/**/*.html", ['html']);
    gulp.watch("./src/*.html").on('change', browserSync.reload);
});