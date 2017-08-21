require("time-require");
var gulp = require('gulp'),
	path = require('path'),
	sass = require('gulp-sass'),
	prefix = require('gulp-autoprefixer'),
	minifyCSS = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	watch = require('gulp-watch'),
	plumber = require('gulp-plumber'),
	size = require('gulp-filesize'),
	cache = require('gulp-cache'),
	notify = require("gulp-notify"),
	gulpFilter = require('gulp-filter'),
	include = require('gulp-include'),
	svgstore = require('gulp-svgstore'),
	svgmin = require('gulp-svgmin'),
	rename = require("gulp-rename"),
	inject = require('gulp-inject'),
	cheerio = require('gulp-cheerio'),
	chug = require('gulp-chug'),
	del = require('del'),
	gcmq = require('gulp-group-css-media-queries'),
	webpack = require('webpack-stream'),
	sourcemaps = require("gulp-sourcemaps");


// CREATE SVG SPRITE
gulp.task('sprites', function () {
    return gulp.src('assets/src/img/svg/*.svg')
        .pipe(svgmin())
        .pipe(cheerio({
        	run: function ($) {
                $('[fill]').removeAttr('fill');
            },
            parserOptions: { xmlMode: true }
        }))
	    .pipe(svgstore({
	    	fileName: 'icons.svg',
	    	prefix: 'icon-'
         }))
	    .pipe(rename('sprites.svg'))
	    .pipe(gulp.dest('assets/dist/img/svg'));
});


// HANDLE SASS
gulp.task('styles', function() {
	gulp.src('assets/src/scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(sass({
			outputStyle: 'nested'
		}) )
		.pipe(prefix("last 2 versions"))
		.pipe(gcmq())
		//.pipe(minifyCSS()) // TODO : Uncomment for prod
		.pipe(sourcemaps.write()) // TODO : Remove for prod
		.pipe(gulp.dest('assets/dist/css'))
		.pipe(size())
		.pipe(notify("SASS finished compiling"))
});

gulp.task('criticalCSS', function() {
	gulp.src('assets/src/scss/critical.scss')
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(sass({
			outputStyle: 'compressed'
		}) )
		.pipe(prefix("last 2 versions"))
		.pipe(gulp.dest('assets/dist/css'))
		.pipe(size())
		.pipe(notify("SASS Critical finished compiling"))
});

// HANDLE JS
gulp.task('scripts', function() {
  	return gulp.src(['assets/src/js/app.js', 'assets/src/js/vendors.js'])
    	.pipe(webpack(require('./webpack.config.js')))
    	.pipe(gulp.dest('assets/dist/js'));
});

// IMAGE MIN
gulp.task('img', function () {
	var filter = gulpFilter(['*', '!placeholder-**']);

  	gulp.src('assets/src/img/*')
  // 		.pipe(filter)
		.pipe(cache(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			optimizationLevel: 3,
			interlaced: true,
			src: ['**/*.{png,jpg,gif}'],
		})))
		.pipe(gulp.dest('assets/dist/img/'));
});



// FONTS
gulp.task('fonts', function() {
	return gulp.src('assets/src/fonts/*')
		.pipe(gulp.dest('assets/dist/fonts'));
});


// CLEAR CACHE
gulp.task('clear', function (done) {
    return cache.clearAll(done);
});


// CLEAN UP
gulp.task('clean', function() {
	return del.sync('assets/dist');
});



// WATCH
gulp.task('watch', ['styles'], function() {

    // Watch .scss files
    gulp.watch('assets/src/scss/**/*.scss', ['styles', 'criticalCSS']);

    // Watch .js files
    gulp.watch('assets/src/js/**/*.js', ['scripts']);

	// Watch vendors .js files
    //gulp.watch('assets/src/js/vendors/**/*.js', ['vendorsjs']);

    // Watch image files
    gulp.watch('assets/src/img/*', ['img']);
});


gulp.task('default', function() {
	//gulp.start('clean', 'sprites', 'styles', 'scripts', 'vendorsjs', 'img', 'fonts', 'watch', 'clear');
	gulp.start('clean', 'sprites', 'styles', 'criticalCSS', 'scripts', 'img', 'fonts', 'watch', 'clear');
});