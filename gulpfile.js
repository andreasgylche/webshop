// Load plugins
const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const terser = require("gulp-terser");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");

// Compiling styles
function compile() {

    return (
        gulp.src("styles/**/*.scss")
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(postcss([autoprefixer({grid:true}), cssnano()]))
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest("styles"))
            .pipe(browserSync.stream())
    );

}

// Compiling scripts
function js() {

    return (
        gulp.src(["scripts/**/*.js", "!scripts/**/*.min.js"])
            .pipe(sourcemaps.init())
            .pipe(terser())
            .pipe(rename({
                suffix:(".min")
            }))
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest("scripts"))
    );

}

// Watching for changes and reloading browsers
function watch() {

    browserSync.init({
        server: {
            baseDir: "./",
            notify: false // browser-sync notification in right upper corner
        }
    });

    gulp.watch("styles/**/*.scss", compile);
    gulp.watch("./*.html").on("change", browserSync.reload);
    gulp.watch(["scripts/**/*.js", "!scripts/**/*.min.js"], js);
    gulp.watch("./scripts/**/*.js").on("change", browserSync.reload);

}

// Optimze images
function optimize() {

    return (
        gulp.src("images/*")
            .pipe(imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.jpegtran({progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({
                    plugins: [
                        {removeViewBox: true},
                        {cleanupIDs: false}
                    ]
                })
            ]))
            .pipe(gulp.dest("images"))

    );
}

// Building the project
const build = gulp.series(compile, js);

// Exporting functions
exports.compile = compile;
exports.js = js;
exports.optimize = optimize;
exports.watch = watch;
exports.build = build;