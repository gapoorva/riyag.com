var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var spawn = require('child_process').spawn;
var node;

// paths for Sass compilation sources
var sassPaths = [
  'public/bower_components/normalize.scss/sass',
  'public/bower_components/foundation-sites/scss',
  'public/bower_components/motion-ui/src'
];

// Js sources
var jsSources = [
  'public/bower_components/jquery/dist/**/*.min.js',
  'public/bower_components/what-input/dist/**/*.min.js',
  'public/bower_components/foundation-sites/dist/**/*.min.js',
  'public/src/js/**/*.js'
];

// Path for server executable
var executePath = ["bin/www"];

// Path for server source files and dependent files
var appPaths = [
  'routes/*.js',
  'views/*.hbs',
  'public/css/*.css',
  'public/js/*.js',
  'app.js'
];

// Sass Task
gulp.task('sass', function() {
  return gulp.src('public/src/scss/main.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('public/css'));

});

// JS Compilation and minification task
gulp.task('js', function() {
  return gulp.src(jsSources)
    .pipe($.uglify())
    .pipe($.concat('main.js'))
    .pipe(gulp.dest('public/js'));
});

// Server Task
gulp.task('server', function() {
  if (node) node.kill();
  node = spawn('node', executePath, {stdio: 'inherit'});
  node.on('close', function(code) {
    if (code === 8) 
      gulp.log('Error detected, waiting for changes...');
  });
})

// Runs by default when you type 'gulp'
gulp.task('default', ['sass', 'js', 'server'] ,function() {
  gulp.watch(['public/src/scss/**/*.scss'], ['sass']);
  gulp.watch(['public/src/js/**/*.js'], ['js']);
  gulp.watch(appPaths, ['server']);
});


/*
Original Sass gulpfile:

var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var sassPaths = [
  'bower_components/normalize.scss/sass',
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('default', ['sass'], function() {

  // There was an '*' here->v but took it out cause of comment
  gulp.watch(['public/scss/* /*.scss'], ['sass']);
});

*/