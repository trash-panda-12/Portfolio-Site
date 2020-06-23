
    // -[] Sass compiler -
    // [] AutoPrefix the CSS -
    // [] Find a watch and reload


    const gulp = require("gulp");
    const sass = require("gulp-sass");
    sass.compiler = require('sass');
    const autoprefixer = require("gulp-autoprefixer");





    function styles() {
        return gulp.src('src/sass/main.scss', {allowempty : true})
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'))
        .pipe(gulp.src('src/css/main.css'))
        .pipe(autoprefixer())
        .pipe(gulp.dest('src/css/main.css'))
    };
    


    function watchFiles() {
        console.log("\r\n Watching Sass files \r\n");
        gulp.watch('src/**/*.scss', styles);
    }

exports.default = styles;
exports.watch = watchFiles;
