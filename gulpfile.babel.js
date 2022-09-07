import { src, dest, watch, series, parallel } from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';
import gulpif from 'gulp-if';
import yargs from 'yargs';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';

const PRODUCTION = yargs.argv.prod;

const sass = gulpSass(dartSass);

//Convert scss into css and i. production minify and add prefixes
export const styles = () => {
  return src('src/scss/main.scss')
    .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(PRODUCTION, postcss([autoprefixer])))
    .pipe(gulpif(PRODUCTION, cleanCss({ compatibility: 'ie8' })))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
    .pipe(dest('css'));
};

export const watchForChanges = () => {
  watch('src/scss/**/*.scss', styles);
};

export const dev = series(styles, watchForChanges);
export const build = parallel(styles);
export default dev;
