
//Easy npm bunch install
// npm i --save-dev gulp gulp-sass gulp-autoprefixer gulp-concat gulp-clean-css


const gulp = require("gulp");
// const browserSync = require('browser-sync').create();
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");

//enter main sass directory here
const mainSassFile = "./src/scss/main.scss";
const mainsassFileOutput = "./src"

function styles() {
    return gulp.src(mainSassFile)
     .pipe(sass().on('error', sass.logError))
     .pipe(cleanCSS())
     .pipe(autoprefixer('last 2 versions'))
     .pipe(gulp.dest(mainsassFileOutput));
     
};


function dist(done) {
    gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'));

    gulp.src('./src/main.css')
    .pipe(gulp.dest('./dist'));

    gulp.src('./src/js/*')
        .pipe(gulp.dest('./dist/js'));

    gulp.src('./src/images/*')
    .pipe(gulp.dest('./dist/images'));



    done();
};

const baseDirectoryFolder = './src';
//Main index file in base directory folder to watch
const indexFile = 'index.html';

function server() {
    console.log("\r\n Starting BrowserSync \r\n" );

    browserSync.init({
        server: {
            baseDir: baseDirectoryFolder,
            index: indexFile
        },
    });
};

function reload(done) {
    browserSync.reload();
    done();
};

function fullWatchFiles() {
    
    
    gulp.watch('./src/*.html', reload);
    gulp.watch('./src/scss/*.scss', gulp.series(styles,reload));

    gulp.watch('./src/js/*.js', reload);
    
    
};

function watchFiles() {
    console.log("\r\n **Beginning SCSS Watch** \r\n");
    // gulp.watch('./src/*.html', reload);

    gulp.watch('./src/scss/*.scss', styles);

    // gulp.watch('./src/js/*.js', reload);
    
};



//Make a server and watch HTML, JS, & SCSS files
exports.fullWatch = gulp.parallel(server, fullWatchFiles);

//Watch files without making a server. Used for VSCode
exports.watch = watchFiles;

//Move html, css and js files to dist folder
exports.dist = dist;

//Concatenate Sass files, autoprefix and clean, then process into CSS
exports.styles = styles;


// exports.default = defaultTask