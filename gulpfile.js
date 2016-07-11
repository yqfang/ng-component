var fs = require('fs');
var del = require('del');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var pkg = require('./package.json');
var through = require('through2');
var header_config = {
  config: {
  	pkg: pkg,
  	timestamp: (new Date()).toISOString()
  },
  banner:
      '/*!\n' +
      ' * <%= pkg.name %>\n' +
      ' * <%= pkg.homepage %>\n' +
      ' * <%= pkg.author %>\n' +
      ' * @version: <%= pkg.version %> - <%= timestamp %>\n' +
      ' * @license: <%= pkg.license %>\n' +
      ' */\n'
};
gulp.task('default', ['build:extra_modules','build:ie_pack']);
gulp.task('build:extra_modules',function(){
  return gulp.src([
      'lib/ct-ui-router-extras.js','lib/ocLazyLoad.js','node_modules/codemirror/lib/codemirror.js','node_modules/codemirror/mode/sql/sql.js',
      'node_modules/angular-ui-codemirror/src/ui-codemirror.js','lib/angular.translate.js','node_modules/angular-dialog-service/dist/dialogs-default-translations.js',
      'node_modules/angular-dialog-service/dist/dialogs-default-translations.js','node_modules/angular-dialog-service/dist/dialogs.js',
      'node_modules/angular-smart-table/dist/smart-table.min.js','lib/dialog/main.js'
      ])
       .pipe($.plumber({
        errorHandler: handleError
      }))
      .pipe($.ngAnnotate())
      .pipe($.concat('modules-required.js'))
      .pipe($.header(header_config.banner, header_config.config))
      .pipe(gulp.dest('dist/extra-lib/js/modules'))
      .pipe($.uglify())
      .pipe($.concat('modules-required.min.js'))
      .pipe(gulp.dest('dist/extra-lib/js/modules'));
})
gulp.task('build:ie_pack',function(){
  return gulp.src(['lib/json3/json3.js','lib/es5/es5-shim.js','lib/html5shiv/html5shiv.js','lib/createElement.js','lib/respond.js'])
            .pipe($.plumber({
              errorHandler: handleError
            }))
            .pipe($.ngAnnotate())
            .pipe($.concat('ie8.js'))
            .pipe($.header(header_config.banner, header_config.config))
            .pipe(gulp.dest('dist/extra-lib/js/ie'))
            .pipe($.uglify())
            .pipe($.concat('ie8.min.js'))
            .pipe(gulp.dest('dist/extra-lib/js/ie'))
})
var handleError = function (err) {
  console.log(err.toString());
  this.emit('end');
};
