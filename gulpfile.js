import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import gulpAutoprefixer from 'gulp-autoprefixer';
import gulpConcat from 'gulp-concat';
import gulpBabel from 'gulp-babel';
import gulpUglify from 'gulp-uglify';
import browserSync from 'browser-sync';

const sass = gulpSass(dartSass);

browserSync.create();

// Build all scss files into css files and add autoprefixer
const buildStyles = () => {
  return gulp
    .src('./assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(
      gulpAutoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
      })
    )
    .pipe(gulp.dest('./assets/styles'))
    .pipe(browserSync.stream());
};

// Init Browser Sync
const browserSyncInit = () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
};

// Build Javascript code
const buildJS = () => {
  return gulp
    .src('./assets/scripts/**/*.js')
    .pipe(gulpConcat('app.min.js'))
    .pipe(
      gulpBabel({
        presets: ['@babel/env']
      })
    )
    .pipe(gulpUglify())
    .pipe(gulp.dest('./assets/scripts/'))
    .pipe(browserSync.stream());
};

// Tasks

gulp.task('browser-sync', browserSyncInit);

gulp.task('sass', async () => {
  buildStyles();
});
gulp.task('js', async () => {
  buildJS();
});

// Watch for changes
const watch = () => {
  gulp.watch('./assets/sass/**/*.scss', gulp.series('sass'));

  gulp.watch('./**/*.html').on('change', browserSync.reload);

  gulp.watch('./assets/scripts/*.js', gulp.series('js'));
};

gulp.task('watch', watch);

// Default task
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'js'));
