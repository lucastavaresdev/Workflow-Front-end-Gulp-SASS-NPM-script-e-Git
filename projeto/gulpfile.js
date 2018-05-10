var gulp = require('gulp')
    , sass = require('gulp-sass')
    , include = require('gulp-file-include')
    , clean = require('gulp-clean')
    , autoprefixer = require('gulp-autoprefixer')
    , uncss = require('postcss-uncss')
    , imagemin = require('gulp-imagemin')
    , cssnano= require('gulp-cssnano')
    , uglify = require('gulp-uglify')
    , concat = require('gulp-concat')
    , rename = require('gulp-rename')
    , browserSync = require('browser-sync')

    gulp.task('clean', function(){
        return gulp.src('dist')
            .pipe(clean());
    })

gulp.task('copy', ['clean'], function () {
    gulp.src([
        'src/components/**/*',
        'src/javascript/**/*',
        'src/index.html',
    ], { "base": "src" })//o base mantem a estrutura
        .pipe(gulp.dest('dist'))
})


gulp.task('sass', function(){
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(gulp.dest('./dist/css/'));
})

gulp.task('svgmin', function(){
    return gulp.src(['src/inc/icon/*.svg,   !./src/inc/icon/*min.svg'])
        .pipe(imagemin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('src/inc/icon/*.svg'))
})


gulp.task('build-js', function(){
    gulp.src('src/javascript/**/*')
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/javascript/'))
})


gulp.task('html', function(){
    return gulp.src([
            './src/**/*.html',
            '!src/inc/**'
        ])
        .pipe(include())
        .pipe(gulp.dest('./dist/'))
})


gulp.task('uncss', ['html'], function(){
    return gulp.src('./dist/components/**/*.css')
        .pipe(uncss({
            html: ['./dist/*.html']
        }))
        .pipe(gulp.dest('./dist/components/'))
})

gulp.task('imagemin', function(){
    return gulp.src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img/'))
});


gulp.task('default', ['copy' ,], function(){
    gulp.start('uncss', 'imagemin', 'sass' , 'build-js')
})



gulp.task('serve',['html'], function () {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
});

    gulp.watch('./dist/**/*').on('change', browserSync.reload)

    //monitora alteração caso sera alteradao reload o browser
    gulp.watch('./src/sass/**/*.scss', ['sass'])
    gulp.watch('./src/**/*.html', ['html'])
    gulp.watch('.src/javascript/**/*', ['build-js'])
  gulp.watch([
      './src/inc/icon/*.svg',
      '!./src/inc/icon/*min.svg'
    ], ['svgmin'])
})


