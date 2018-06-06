const gulp = require('gulp');
const through2 = require('through2').obj;
const htmlbeautify = require('gulp-html-beautify');
const gulpTemplater = require('./g_templater.js');

gulp.task('build', function () {
    gulp.src('spec/stage-8/*.html')
        .pipe(gulpTemplater({
            tags: {
                'panel': '<div class="panel"><div class="panel-heading">{{heading}}</div><div class="panel-body">{{html}}</div></div>'
            }
        }))
        .pipe(htmlbeautify())
        .pipe(gulp.dest('public'))
})