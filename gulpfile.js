const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const smartgrid  = require('smart-grid');


const smartgridSettings = {
    outputStyle: 'scss',
    columns: 12, // number of grid columns
    offset: '15px', // gutter width px || %
    filename: '_smart-grid',
    container: {
        maxWidth: '1200px', // max-width оn very large screen
        fields: '15px' // side fields
    },
    breakPoints: {
        xlg: {
            'width': '1850px',
            'fields': '15px'
        },
        lg: {
            'width': '1200px',
            'fields': '15px'
        },
        md: {
            'width': '992px',
            'fields': '15px'
        },
        sm: {
            'width': '768px',
            'fields': '15px'
        },
        xs: {
            'width': '544px',
            'fields': '15px'
        },
        xxs: {
            'width': '420px',
            'fields': '15px'
        }
    }
};

function style() {
//    1. where ys my scss file
    return gulp.src('./src/scss/**/*.scss')
    //    2. pass that file through sass compiler
        .pipe(sass().on('error',sass.logError))
        //    3. where do I save the comp
        .pipe(gulp.dest('./dist/css'))
        //    4. stream changes to all browser
        .pipe(browserSync.stream())
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./src/scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
}



function babelF(){
  return gulp.src('.src/js/**/*.js')
      .pipe(babel({
          presets: ['@babel/env']
      }))
      .pipe(gulp.dest('dist/js'))
}

function complileSmartGrid(){
   return smartgrid('./src/scss/mixins', smartgridSettings);
}

exports.style = style;
exports.watch = watch;
exports.babel = babelF;
exports.smartgrid = complileSmartGrid;
