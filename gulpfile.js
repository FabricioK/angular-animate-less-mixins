// gulp
var gulp = require('gulp'),
    del = require('del'),
    less = require('gulp-less'),
    path = require('path'),  
    inject = require('gulp-inject');



var allBowerRequiredFirstComponentsAngular = ['./bower_components/angular/**/*.min.js'];

var allBowerRequiredFirstComponentsJquery = [
    './bower_components/jquery/**/*.min.js'
    , '!./bower_components/jquery/**/*.slim.min.js'
];
var allBowerAuxComponents = [
    './bower_components/**/*.min.js'
    , './bower_components/**/*.min.js'
        , './bower_components/**/*-typewrite.js'
    , '!./bower_components/jquery/**/*.min.js'
    , '!./bower_components/rangy/**/*.min.js'
    , '!./bower_components/angular/**/*.min.js'];

var allCssFiles = [
    './bower_components/**/*.css'
    , './app/**/*.css'
    , '!./bower_components/**/*-theme.css'
    , '!./bower_components/**/*.min.css'
    , '!./bower_components/**/*-csp.css'];


var allFontsFiles = [
                './bower_components/**/*.otf',
                './bower_components/**/*.eot',
                './bower_components/**/*.svg',
                './bower_components/**/*.ttf',
                './bower_components/**/*.woff',
                './bower_components/**/*.woff2'];

var LessFiles = [
    './app/less/**/*.less']

var allTemplatesFiles = ['./app/templates/**/*.html'];


function clean() {
    return del('./dist/**/*');
};


function cssmove() {
    return gulp.src(allCssFiles)
        .pipe(gulp.dest('dist/css'));
}

function lessmove() {

  return gulp.src(LessFiles)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('dist/css'));
}
function templatesmove() {
    return gulp.src(allTemplatesFiles)
        .pipe(gulp.dest('dist/templates'));
}

function fontsmove() {
    return gulp.src(allFontsFiles)
        .pipe(gulp.dest('dist/css'));
}

function bowerminJquery() {
    return gulp.src(allBowerRequiredFirstComponentsJquery)
        .pipe(gulp.dest('dist/jquery'));
};
function bowerminAngular() {
    return gulp.src(allBowerRequiredFirstComponentsAngular)
        .pipe(gulp.dest('dist/angular'));
};
function bowerAuxmin() {
    return gulp.src(allBowerAuxComponents)
        .pipe(gulp.dest('dist/boweraux'));
};

function appmin() {
    return gulp.src('./app/scripts/demo.js')
    // .pipe(uglify())
        .pipe(gulp.dest('dist'));
};
//Injects 
function injectBowerJquery() {
    return gulp.src('./views/index.html')
        .pipe(inject(gulp.src(['./dist/jquery/**/*.js'], { read: false })
            , { starttag: '<!-- inject:bowerjquery:{{ext}} -->' }))
        .pipe(gulp.dest('./views'));
};
function injectBowerAngular() {
    return gulp.src('./views/index.html')
        .pipe(inject(gulp.src(['./dist/angular/**/*.js'], { read: false })
            , { starttag: '<!-- inject:bowerangular:{{ext}} -->' }))
        .pipe(gulp.dest('./views'));
};
function injectAuxBower() {
    return gulp.src('./views/index.html')
        .pipe(inject(gulp.src(['./dist/boweraux/**/*.js'], { read: false })
            , { starttag: '<!-- inject:boweraux:{{ext}} -->' }))
        .pipe(gulp.dest('./views'));
};
function injectCss() {
    return gulp.src('./views/index.html')
        .pipe(inject(gulp.src(['./dist/css/**/*.css'], { read: false })
            , { starttag: '<!-- inject:css:{{ext}} -->' }))
        .pipe(gulp.dest('./views'));
};

function injectLess() {
    return gulp.src('./views/index.html')
        .pipe(inject(gulp.src(['./dist/less/**/*.less'], { read: false })
            , { starttag: '<!-- inject:lessfiles -->' }))
        .pipe(gulp.dest('./views'));
};

function injectApp() {

    return gulp.src('./views/index.html')
        .pipe(inject(gulp.src(['./dist/demo.js'], { read: false })
            , { starttag: '<!-- inject:app:{{ext}} -->' }))
        .pipe(gulp.dest('./views'));
};

function injectAppContent() {
    return gulp.src('./views/index.html')
        .pipe(inject(gulp.src(['./dist/appmin/**/*.js'], { read: false })
            , { starttag: '<!-- inject:appcontent:{{ext}} -->' }))
        .pipe(gulp.dest('./views'));
};

gulp.task('prod'
    , gulp.series(
        clean,
        cssmove,
        lessmove,
        templatesmove,
        fontsmove,
        bowerminJquery,
        bowerminAngular,
        bowerAuxmin,
        appmin,
        injectLess,
        injectCss,       
        injectBowerJquery,
        injectBowerAngular,
        injectAuxBower,
        injectApp,
        injectAppContent
        ));