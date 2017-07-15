require("time-require");
var gulp = require('gulp'),
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
	//browserSync = require('browser-sync').create(),
	del = require('del'),
	gcmq = require('gulp-group-css-media-queries'),
	//babel = require("gulp-babel"),
	webpack = require('webpack-stream'),
	sourcemaps = require("gulp-sourcemaps");


// CREATE SVG SPRITE
gulp.task('sprites', function () {
    return gulp.src('assets/src/img/svg/*.svg')
        //.pipe(svgmin())
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
	    .pipe(gulp.dest('assets/dist/img'));
});


// HANDLE SASS
gulp.task('styles', function() {
	gulp.src('assets/src/scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(sass({
			outputStyle: 'expanded'
		}) )
		.pipe(prefix("last 2 versions"))
		.pipe(minifyCSS())
		.pipe(gcmq())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('assets/dist/css'))
		.pipe(size())
		.pipe(notify("SASS finished compiling"))
		//.pipe(browserSync.stream());
});

// HANDLE JS
/*
gulp.task('scripts', function() {
  	gulp.src('assets/src/js/*')
	  	.pipe(sourcemaps.init())
  		.pipe( plumber({errorHandler: notify.onError("Error: <%= error.message %>")}) )
  		//.pipe( include() )	// allows us to include javascript files like sprockets
    	.pipe( concat('build.js') )
    	//.pipe(uglify()) // TODO: uglify for prod
		.pipe(sourcemaps.write())
    	.pipe(gulp.dest('assets/dist/js'))
    	.pipe(size())
    	.pipe(notify("JS finished compiling"));

	// gulp.src('assets/src/js/controllers/*.js')
	//     .pipe( plumber() )
  	// 	.pipe( include() )	// allows us to include javascript files like sprockets
    //     .pipe( uglify() )
    //     .pipe(gulp.dest( 'assets/dist/js/controllers/' ) );
});
*/

gulp.task('scripts', function() {
  	return gulp.src('assets/src/js/app.js')
  		.pipe( plumber({errorHandler: notify.onError("Error message: <%= error.message %>")}) )
    	.pipe(webpack({
			watch: true,
			output: {
				filename: 'build.js',
			},
			devtool: 'inline-source-map'
		}))
    	.pipe(gulp.dest('assets/dist/js'))
    	.pipe(size())
    	.pipe(notify("JS finished compiling"));
});

gulp.task('vendorsjs', function() {
  	return gulp.src('assets/src/js/vendors.js')
  		.pipe( plumber({errorHandler: notify.onError("Error message: <%= error.message %>")}) )
    	.pipe(webpack({
			watch: true,
			output: {
				filename: 'vendors.js',
			},
			devtool: 'inline-source-map'
		}))
    	.pipe(gulp.dest('assets/dist/js'))
    	.pipe(size())
    	.pipe(notify("JS finished compiling"));
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


// BROWSER SYNC
gulp.task('serve', ['styles'], function() {
    browserSync.init({
		open: 'external',
		port: 80,
        proxy: 'localhost/wgdo',
		ghostMode: {
			clicks: true,
			forms: true,
			scroll: true
		}
    });
});




// WATCH
gulp.task('watch', ['styles'], function() {

    // Watch .scss files
    gulp.watch('assets/src/scss/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('assets/src/js/**/*.js', ['scripts']);

	// Watch vendors .js files
    gulp.watch('assets/src/js/vendors/**/*.js', ['vendorsjs']);

    // Watch image files
    gulp.watch('assets/src/img/*', ['img']);

	// Browser Sync for PHP
    //gulp.watch("./*.php").on('change', browserSync.reload);
});


gulp.task('default', function() {
	gulp.start('clean', 'sprites', 'styles', 'scripts', 'vendorsjs', 'img', 'fonts', 'watch', 'clear');
});