var gulp    = require('gulp');
var ts      = require('gulp-typescript');

var env     = process.env.ENV || 'dev';

var tsFiles = ['server/**/*.ts'];

var tsProject = ts.createProject('tsconfig.json');
  
var server, mocha, exec;
if (env === 'dev') {
  tsFiles.push('tests/**/*.ts');
  server  = require('gulp-develop-server');
  mocha = require('gulp-mocha');
} else {
  exec = require('child_process').exec;
}

// ** Default ** //

gulp.task('default', ['run']);

if (env === 'dev') {
  
  // ** Start server ** //
  
  gulp.task('start', ['test'], function () {
    server.listen({path: 'bin/www'});
  });
  
  // ** Restart server ** //
  
  gulp.task('restart', ['test'], function () {
    server.restart();
  });
  
  // ** Testing ** //

  gulp.task('test', ['build'], function() {
    gulp
      .src('tests/**/*.js')
      .pipe(mocha());
  });
  
  // ** Running ** //
  
  gulp.task('run', ['start'], function () {
    gulp.watch(tsFiles, ['restart']);  
  });
  
} else {
  
  // ** Running ** //
  
  gulp.task('run', function (cb) {
    exec('node bin/www', function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  });
  
}

// ** Compilation ** //

gulp.task('build', function () {
  var tsResult = gulp
    .src(tsFiles) 
    .pipe(ts(tsProject));
    
  return tsResult.js.pipe(gulp.dest('server'));
});
