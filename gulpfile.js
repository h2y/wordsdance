var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();


//watch
gulp.task('watch', ['default'], function() {
    gulp.watch('lib/**/*', ['default']);
});


//default
gulp.task('default', function() {
    gulp.start('styles', 'js', 'html');
});


//////////////////

//styles
gulp.task('styles', function() {
    //less & css
    gulp.src(['lib/styles/*.less', 'lib/styles/*.css'])
        //.pipe($.sourcemaps.init())
        .pipe($.concat('style.css'))
        .pipe($.less())
        .pipe($.autoprefixer({
            browsers: ['> 5% in CN']
        }))
        //.pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});


//js
gulp.task('js', function() {
    gulp.src('lib/js/*.js')
        .pipe($.sourcemaps.init())
        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe($.concat('main.js'))
        .pipe($.uglify())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});


//html
gulp.task('html', function() {
    gulp.src('lib/index.html')
        .pipe($.inlineSource({rootpath:'dist'}))
        .pipe($.htmlmin({
            collapseWhitespace: true,
            sortAttributes: true
        }))
        .pipe(gulp.dest('dist'));
});
