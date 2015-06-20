var gulp    = require('gulp');
var ts      = require('gulp-typescript');

var env     = process.env.ENV || 'dev';

var tsProject = ts.createProject('tsconfig.json');

var paths = {
  server: {
    src: 'server/**/*.ts',
    out: 'server'
  },
  tests: {
    src: 'tests/**/*.ts',
    out: 'tests',
    mocha: 'tests/server/unit/**/*.js'
  }
}

var server, mocha, exec, files;
if (env === 'dev') {
  files = [paths.server.src, paths.tests.src];
  server = require('gulp-develop-server');
  mocha = require('gulp-mocha');
} else {
  files = [paths.server.src];
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
  
  // ** Compile tests ** //
  
  gulp.task('buildTests', ['build'], function () {
    compile(paths.tests.src, paths.tests.out);
  });
  
  // ** Testing ** //

  gulp.task('test', ['buildTests'], function (cb) {
    gulp
      .src(paths.tests.mocha)
      .pipe(mocha())
      .once('error', handleError)
      .once('end', cb);
  });
  
  // ** Running ** //
  
  gulp.task('run', ['start'], function () {
    gulp.watch(files, ['restart']);  
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
  compile(paths.server.src, paths.server.out);
});

function compile(src, out) {
  var tsResult = gulp
    .src(src)
    .pipe(ts(tsProject))
    .once('error', handleError);
    
  return tsResult.js.pipe(gulp.dest(out));
}

function handleError(err) {
  if (env === 'dev') {
    //console.log('Error occured: ' + err.message);
    gulp.watch(files, ['restart']);
  } else {
    throw err;
  }
}