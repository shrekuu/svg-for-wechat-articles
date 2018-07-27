var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    notify = require('gulp-notify');

var stylesheets = {
    src: './assets/scss/**/*.scss',
    dist: './www/css/assets/css', // 不要改成 /www/css, 避免多人协作时覆盖掉别人的文件
};

// 编译 sass
gulp.task('sass', function () {
    gulp.src(stylesheets.src)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .on('error', function (error) {
            console.log('========================');
            console.log('文件:', error.file);
            console.log('  行:', error.line);
            console.log('  列:', error.column);
            console.log('错误:', error.message);
            console.log('========================');
        })
        .pipe(autoprefixer({
            browsers: ['last 5 versions']
        }))
        .pipe(gulp.dest(stylesheets.dist))
        .pipe(livereload());
});

// 文件有改动就编译
gulp.task('watch', function () {

    // 先编译一遍再说
    gulp.start('sass');

    livereload.listen();

    gulp.watch(stylesheets.src, [
        'sass'
    ]);
});

// 默认任务
gulp.task('default', function () {
    gulp.start('sass');
});


