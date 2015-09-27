if (!require) {
  consolo.log("This file is for Node JS.");
} else {
  var gulp = require("gulp");
  var watch = require("gulp-watch");
  var minifyHTML = require("gulp-minify-html");
  var browserify = require("gulp-browserify");
  var minifyCss = require("gulp-minify-css");
  var htmlhint = require("gulp-htmlhint");
  var csslint = require("gulp-csslint");
  var please = require("gulp-pleeease");
  var plumber = require("gulp-plumber");
  var connect = require("gulp-connect");
  var rename = require("gulp-rename");
  var jshint = require("gulp-jshint");
  var notify = require("gulp-notify");
  var uglify = require("gulp-uglify");
  var csscomb = require("csscomb");
  var jscs = require("gulp-jscs");
  var sass = require("gulp-sass");
  var sftp = require("gulp-sftp");


  var path = "../test_html/**/";
  var pathPublish = "../test_html/";

  gulp.task("html", function() {
    gulp.src([path + "*.html", "!" + path + "*.min.html"])
      .pipe(plumber({
        errorHandler: notify.onError("Error: <%= error.message %>") //<-
      }))
      .pipe(htmlhint({ "doctype-first": false }))
      .pipe(htmlhint.reporter())
      .pipe(minifyHTML())
      .pipe(rename({
        extname: '.min.html'
      }))
      .pipe(gulp.dest(pathPublish));
  });

  gulp.task("css", function() {
    gulp.src([path + "*.css", "!" + path + "*.min.css"])
      .pipe(plumber({
        errorHandler: notify.onError("Error: <%= error.message %>") //<-
      }))
      .pipe(csslint())
      .pipe(csslint.reporter())
      .pipe(please())
      .pipe(minifyCss())
      .pipe(rename({
        extname: '.min.css'
      }))
      .pipe(gulp.dest(pathPublish));
  });

  gulp.task("scss", function() {
    gulp.src([path + "*.scss", "!" + path + "*.min.scss"])
      .pipe(plumber({
        errorHandler: notify.onError("Error: <%= error.message %>") //<-
      }))
      .pipe(sass())
      .pipe(gulp.dest(pathPublish));
  });

  gulp.task("js", function() {

    gulp.src([path + "*.js", "!" + path + "*.min.js"])
      .pipe(plumber())
      .pipe(jscs())
      .pipe(jshint(".jshintrc"))
      .pipe(jshint.reporter("jshint-stylish"))
      //.pipe(jshint.reporter("fail"))
      .pipe(uglify())
      .pipe(rename({
        extname: ".min.js"
      }))
      .pipe(gulp.dest(pathPublish));

  });

  gulp.task("sftp", function() {

  });


  gulp.task("watch", function() {

    watch([path + "*.html", "!" + path + "*.min.html"], function(){
      gulp.start("html");
    })

    watch([path + "*.css", "!" + path + "*.min.css"], function(){
      gulp.start("css");
    })

    watch([path + "*.scss", "!" + path + "*.min.scss"], function(){
      gulp.start("scss");
    })

    watch([path + "*.js", "!" + path + "*.min.js"], function(){
      gulp.start("js");
    })


  });


}
