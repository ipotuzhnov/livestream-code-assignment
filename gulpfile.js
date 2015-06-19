var gulp    = require('gulp');
var ts      = require('gulp-typescript');
var nodemon = require('gulp-nodemon'); 

var tsFiles = 'server/**/*.ts'; 
var tsProject = ts.createProject('tsconfig.json');

gulp.task('default', ['build', 'run']);


// ** Running ** //

gulp.task('run', ['build'], function () {
  nodemon({
    script: 'bin/www',
    ext: 'ts',
    ignore: './node_modules',
    tasks: ['build']
  });
});

// ** Watching ** //

gulp.task('watch', function () {
	gulp.watch(tsFiles, ['run']);
});

// ** Compilation ** //

gulp.task('build', function () {
  var tsResult = gulp.src(tsFiles) 
      .pipe(ts(tsProject));
    
  return tsResult.js.pipe(gulp.dest('server'));
});
