
    // -[] Sass compiler -
    // [] AutoPrefix the CSS -
    // [] Find a watch and reload


    const gulp = require("gulp");
    const sass = require("gulp-sass");
    sass.compiler = require('sass');
    const autoprefixer = require("gulp-autoprefixer");





    function sassCompile() {
        return gulp.src('src/sass/main.scss', {allowempty : true})
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'))
    };

    function autoprefix() {
        return gulp.src('src/css/main.css')
        .pipe(autoprefixer())
        .pipe(gulp.dest('src/css'))
    }
    


    function watchFiles() {
        console.log("\r\n Watching Sass files \r\n");
        gulp.watch('src/**/*.scss', gulp.series(sassCompile, autoprefix));
    }

exports.styles = gulp.series(sassCompile,autoprefix);
exports.watch = watchFiles;
