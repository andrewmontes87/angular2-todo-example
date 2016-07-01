var gulp = require('gulp'),
    concat = require('gulp-concat'),
    webserver = require('gulp-webserver'),
    typescript = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    tscConfig = require('./tsconfig.json');

var appSrc = 'builds/development/',
    tsSrc = 'process/typescript/',
    appModules = [
      'node_modules/es6-shim/es6-shim.min.js',
      'node_modules/systemjs/dist/system-polyfills.js',
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/rxjs/bundles/Rx.js',
      'node_modules/angular2/bundles/angular2.dev.js',
      'node_modules/angular2/bundles/http.dev.js',
      'node_modules/angular2/bundles/router.dev.js',
    ],
    cssModules = [
      'node_modules/font-awesome/css/font-awesome.min.css'
    ],
    fontModules = [
      'node_modules/font-awesome/fonts/*'
    ];

gulp.task('html', function() {
  gulp.src(appSrc + '**/*.html');
});

gulp.task('fonts', function() {
   gulp.src(fontModules)
  .pipe(gulp.dest(appSrc + 'fonts')); 
});

gulp.task('css-modules', function() {
  gulp.src(cssModules)
  .pipe(gulp.dest(appSrc + 'css'))
});

gulp.task('css', function() {
  gulp.src(appSrc + '**/*.css');
});

gulp.task('copylibs', function() {
  return gulp
    .src(appModules)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(appSrc + 'js/lib/angular2'));
});

gulp.task('typescript', function () {
  return gulp
    .src(tsSrc + '**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(appSrc + 'js/'));
});

gulp.task('watch', function() {
  gulp.watch(tsSrc + '**/*.ts', ['typescript']);
  gulp.watch(appSrc + 'css/*.css', ['css']);
  gulp.watch(appSrc + '**/*.html', ['html']);
});

gulp.task('webserver', function() {
  gulp.src(appSrc)
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['copylibs', 'typescript', 'css-modules', 'fonts', 'watch', 'webserver']);
