var gulp = require('gulp')
    , sass = require('gulp-sass')
    , include = require('gulp-file-include')
    , clean = require('gulp-clean')
    , browserSync = require('browser-sync')

gulp.task('clean', function(){
  return gulp.src('dist')
    .pipe(clean());
})


gulp.task('copy',['clean'] ,function () {
    gulp.src(['src/components/**/*', 'src/css/**/*', 'src/javascript/**/*', 'src/img/**/*'], { "base": "src" })//o base mantem a estrutura
        .pipe(gulp.dest('dist'))
})

gulp.task('sass', function () {
    gulp.src('./src/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css/'));
})


gulp.task('html', function () {
   return gulp.src('./src/index.html')
        .pipe(include())
        .pipe(gulp.dest('./dist/'))
})

gulp.task('serve',['html'] ,function () {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
    gulp.watch('./src/**/*').on('change', browserSync.reload)

    gulp.watch('./src/sass/**/*.scss', ['sass'])
})