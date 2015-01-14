/* reference website http://www.sitepoint.com/introduction-gulp-js/ */

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHtml = require('gulp-minify-html');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var stripDebug = require('gulp-strip-debug');
var minifyCss = require('gulp-minify-css');
var autoprefix = require('gulp-autoprefixer');

//this plugin for debug js file, will display error and correction into console
gulp.task('jshint', function(){

	var srcJs = './src/js/*.js';
	gulp.src(srcJs)
	    .pipe(jshint())
	    .pipe(jshint.reporter('default'));
});


//this function to watch images and compress images
gulp.task('compressImage', function(){

	var srcImage = './src/images/**/*';
	var destImage = './dist/images';

	gulp.src(srcImage)
		.pipe(changed(destImage))
		.pipe(imagemin())
		.pipe(gulp.dest(destImage));
});

//this function to minified html file
gulp.task('minifyHtml', function(){

	var srcHtml = './src/html/*.html';
	var destHtml = './dist/html/';

	gulp.src(srcHtml)
		.pipe(changed(destHtml))
		.pipe(minifyHtml())
		.pipe(gulp.dest(destHtml));
});


//this function to concat(can be used to concat css file also) all js file and code, strip empty space js file
//This example passes an array of filenames to gulp.src(); I want scripts.js to appear at the top of the production file followed by all other JavaScript files in any order. 
gulp.task('concat_strip_debug', function(){

	gulp.src(['./src/js/scripts.js','./src/js/*.js'])
		.pipe(concat('all.min.js'))
		.pipe(stripDebug())
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js/'));
});



//this function to concat css file and minify css code and add auto prefixer browser
gulp.task('css', function(){

	gulp.src(['./src/css/*.css'])
		.pipe(concat('style.css'))
		.pipe(autoprefix('last 2 versions'))
		.pipe(minifyCss())
		.pipe(gulp.dest('./dist/css/'));
});


//to run all the task sekaligus(sequence) guna code ni
//just run 'gulp' command on console to run the default task
gulp.task('default', ['jshint','compressImage', 'minifyHtml','concat_strip_debug', 'css'], function(){



/********************************** optional buang kod dalm block ni shaja klu xse(to watch the changes realtime use this)**********/

	// watch for HTML changes
  gulp.watch('./src/*.html', function() {
    gulp.run('minifyHtml');
  });
 
  // watch for JS changes
  gulp.watch('./src/scripts/*.js', function() {
    gulp.run('jshint', 'scripts');
  });
 
  // watch for CSS changes
  gulp.watch('./src/styles/*.css', function() {
    gulp.run('css');
  });

 /***************************** end optional **************************/

});
 





