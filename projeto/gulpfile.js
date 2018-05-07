var gulp = require('gulp')
    , sass = require('gulp-sass')
    , include = require('gulp-file-include')
    , clean = require('gulp-clean')
    , autoprefixer = require('gulp-autoprefixer')
    , postcss = require('gulp-postcss')
    , browserSync = require('browser-sync')

gulp.task('clean', function () {
    return gulp.src('dist')
        .pipe(clean());
})


gulp.task('copy', ['clean'], function () {
    gulp.src([
        'src/components/**/*',
        'src/css/**/*',
        'src/javascript/**/*',
        'src/img/**/*',
        'src/index.html',
    ], { "base": "src" })//o base mantem a estrutura
        .pipe(gulp.dest('dist'))
})




gulp.task('sass', function () {
    gulp.src('./src/sass/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./dist/css/'));
})
gulp.task('html', function () {
    return gulp.src('./src/**/*.html')
        .pipe(include())
        .pipe(gulp.dest('./dist/'))
})





gulp.task('uncss',['html'], function () {
    return gulp.src('/dist/components/**/*.css')
        .pipe(postcss())
        .pipe(gulp.dest('./dist/components/'));
});


gulp.task('serve', ['uncss'], function () {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })

    gulp.watch('./dist/**/*').on('change', browserSync.reload)

    gulp.watch('./src/sass/**/*.scss', ['sass'])
    gulp.watch('./src/**/*.html', ['html'])
})