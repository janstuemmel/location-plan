const gulp = require('gulp');
const gulpif = require('gulp-if');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const babelify = require('babelify');
const KarmaServer = require('karma').Server;

const TEST_BROWSERS = ((process.env.TEST_BROWSERS || '').replace(/^\s+|\s+$/, '') || 'PhantomJS').split(/\s*,\s*/g);

function Karma(singleRun) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: singleRun,
    browsers: TEST_BROWSERS
  }).start();
}

gulp.task('test', function() {
  Karma(true);
})

gulp.task('watch', function() {
  Karma(false);
});

gulp.task('default', [ 'watch' ]);

gulp.task('build', () => {
  return bundle('./index.js', 'bundle.js', './build', false);
});


function bundle(src, name, outDir, min) {

  var b = browserify({
    entries: src,
    debug: true,
    transform: [ babelify ],
  });

  return b.bundle()
    .pipe(source(name))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(gulpif(min, uglify({
          output: { ascii_only: true, max_line_len: 100000 }
        })))
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(outDir));
}
