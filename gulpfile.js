const gulp = require("gulp");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const tsify = require("tsify");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

const paths = {
  pages: ["src/*.html"]
};

gulp.task("copy-html", function() {
  return gulp.src(paths.pages).pipe(gulp.dest("dist"));
});

// gulp.task("default", function() {
//   return tsProject
//     .src()
//     .pipe(tsProject())
//     .js.pipe(gulp.dest("dist"));
// });

gulp.task("default", gulp.series("copy-html", function() {
  return browserify({
    basedir: ".",
    debug: true,
    entries: ["src/main.ts"],
    cache: {},
    packageCache: {}
  })
    .plugin(tsify)
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("dist"));
}));

// function defaultTask(cb) {
//   cb();
// }

// exports.default = defaultTask;
