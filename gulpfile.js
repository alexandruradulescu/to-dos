"use strict";

let config = {
	outputBase: "dist/",
	
	cssSource: ['src/css/**/*.css'],
	cssOutput: "css/",
	cssName: "style.css",
	
	scriptsSource: ['src/scripts/**/*.js'], 
	startScript: "src/scripts/Script.js",
	scriptsOutput: "scripts/",

	imgSource: ["src/images/**/*"],
	imgOutput: "images",
	debug: true
};

const gulp = require('gulp');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const del = require('del');


gulp.task('scripts', () => {
	const fs = require("fs");
	const browserify = require("browserify");
	const buffer = require('vinyl-buffer');
	const uglify = require('gulp-uglify');
	const source = require('vinyl-source-stream');
	
	return browserify({
			entries: `${config.startScript}`,
			debug: config.debug
		})
		.transform("babelify", {presets: ["es2015"]})
		.bundle()
		.pipe(source(config.scriptsName))
		.pipe(buffer())
		.pipe(gulpif(!config.debug, uglify()))
		.pipe(gulp.dest(config.outputBase + config.scriptsOutput));
});

gulp.task('lint', () => {
	const jshint = require('gulp-jshint');
	return gulp.src(config.scriptsSource)
		.pipe(jshint({ esversion: 6 }))
		.pipe(jshint.reporter('default'));
});

gulp.task('css', (cb) => {
	const postcss = require('gulp-postcss');
	const cleanCSS = require('gulp-clean-css');
	const autoprefixer = require('autoprefixer');

	gulp.src(config.cssSource)
		//.pipe(gulpif(config.debug, sourcemaps.init()))
		.pipe(postcss([ autoprefixer({ browsers: ["> 1%", "Firefox > 3", "ie > 7"] }) ]) )
		.pipe(concat(config.cssName))
		//.pipe(cleanCSS({compatibility: 'ie8'}))
		//.pipe(gulpif(config.debug, sourcemaps.write()))
		.pipe(gulp.dest(config.outputBase + config.cssOutput));
	cb();
});


gulp.task('clean', (cb) => {
	del.sync([config.outputBase]);
	cb();
});

gulp.task('watch-scripts', () => gulp.watch(config.scriptsSource, ['scripts']));
gulp.task('watch-css', () => gulp.watch(config.cssSource, ['css']));

gulp.task('build', ['clean', 'scripts', 'css']); // PRODUCTION
gulp.task('default', ['clean', 'scripts', 'css', 'watch-scripts', 'watch-css']); // DEVELOPMENT
