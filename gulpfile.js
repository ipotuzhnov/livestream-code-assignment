var gulp   = require('gulp');
var ts     = require('gulp-typescript');
var shell  = require('gulp-shell');
var runseq = require('run-sequence');

var tsFiles = 'server/**/*.ts'; 
var tsProject = ts.createProject('tsconfig.json');

gulp.task('default', ['buildrun']);


// ** Running ** //

gulp.task('run', shell.task([
  'node bin/www'
]));

gulp.task('buildrun', function (cb) {
	runseq('build', 'run', cb);
});

// ** Watching ** //

gulp.task('watch', function () {
	gulp.watch(tsFiles, ['build']);
});

gulp.task('watchrun', function () {
	gulp.watch(tsFiles, runseq('build', 'run'));
});

// ** Compilation ** //

gulp.task('build', function () {
  var tsResult = gulp.src(tsFiles) 
      .pipe(ts(tsProject));
    
  return tsResult.js.pipe(gulp.dest('server'));
});
