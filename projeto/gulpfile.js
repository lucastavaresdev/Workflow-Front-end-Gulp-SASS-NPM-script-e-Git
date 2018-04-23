var gulp = require('gulp')
    , sass = require('gulp-sass');

//nome da tarefa e o que vai execultar
gulp.task('sass', function () {
    gulp.src('./src/sass/**/*.scss')//origem; qualquer pasta e qualquer arquivo
        .pipe(sass())//tratamento com o gulp-sass
        .pipe(gulp.dest('./src/css/'));//destino; o pipe faz o tratamento
});

