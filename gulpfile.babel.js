var gulp = require('gulp');
var babel = require('gulp-babel');
var webserver = require('browser-sync').create();
var sass = require('gulp-ruby-sass');
var del = require('del');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var babelify = require('babelify');
var stringify = require('stringify');
var browserify = require('browserify');
var gulpUglify = require('gulp-uglify');
var gulpBundle = require('gulp-bundle-assets');
var gulpSync = require('run-sequence').use(gulp);
var inject = require('gulp-inject');
var es = require('stream-series');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');
var argv = require('yargs').argv;


var config = {
    root: 'app',
    serve: './',
    dist: 'example',
    temp: '.temp',
    sassVendorPath: 'app/resources/vendor/sass',
    sassPath: 'app/resources/app/sass',
    bootstrap: 'bower_components/bootstrap-sass/assets',
    appResources: 'app/resources/app',
    vendorResources: 'app/resources/vendor',
    appName: 'angular-higlightjs-searchtext',
    scriptRelease: 'build',
    scriptMainPath: '/components/angular-highlight-searchtext/highlighter.js'

}

gulp.task('compileApplicationScripts', function () {
    if (argv.env === 'release') {
        return browserify(config.root + config.scriptMainPath, {debug: true})
            .transform("babelify",
                {
                    sourceMaps: true,
                    presets: ["es2015"]
                })
            .transform(stringify, {
                appliesTo: {includeExtensions: ['.html']},
                minify: true
            })
            .bundle()
            .pipe(source('app.js'))
            .pipe(rename(function (path) {
                path.basename = config.appName;
            }))
            .pipe(gulp.dest(config.scriptRelease + '/release'))
            .pipe(streamify(ngAnnotate()))
            .pipe(streamify(gulpUglify({mangle: false})))
            .pipe(gulp.dest(config.temp + '/app'))

    }
    else {
        return browserify(config.root + '/app.js', {debug: true})
            .transform("babelify",
                {
                    sourceMaps: true,
                    presets: ["es2015"]
                })
            .transform(stringify, {
                appliesTo: {includeExtensions: ['.html']},
                minify: true
            })
            .bundle()
            .pipe(source('app.js'))
            .pipe(streamify(ngAnnotate()))
            .pipe(streamify(gulpUglify({mangle: false})))
            .pipe(gulp.dest(config.temp + '/app'))
            .pipe(webserver.stream());
    }

});

gulp.task('bundleVendorScripts', function () {
    return gulp.src('./vendor.bundle.config.js')
        .pipe(gulpBundle())
        .pipe(gulp.dest(config.temp + '/vendor'));
});


gulp.task('compileVendorSaas', function () {
    return sass(config.sassVendorPath + '/vendor.scss', {
        style: 'compressed'
    }).pipe(gulp.dest(config.temp + '/vendor'));

});
gulp.task('compileAppSaas', function () {
    return sass(config.sassPath + '/app.scss', {
        style: 'compressed'
    })
        .pipe(gulp.dest(config.temp + '/app'))
        .pipe(webserver.stream());

});

gulp.task('copyIcons', function () {
    return gulp.src([
            config.bootstrap + '/fonts/**/*.{eot,svg,woff,woff2,ttf}',
            config.appResources + '/fonts/**/*.{eot,svg,woff,woff2,ttf}',
            config.vendorResources + '/fonts/**/*.{eot,svg,woff,woff2,ttf}',
        ])
        .pipe(gulp.dest(config.temp + '/fonts'))
});

gulp.task('copyImages', function () {
    return gulp.src([
            config.appResources + '/images/**/*.{png,jpg,svg,gif}',
            config.vendorResources + '/images/**/*.{png,jpg,svg,gif}',
        ])
        .pipe(gulp.dest(config.temp + '/images'))
});

gulp.task('clean', function () {
    if (argv.env === 'release') {
        return del([config.temp, config.scriptRelease]);
    }
    else {
        return del([config.temp, config.dist, config.scriptRelease]);
    }
});

gulp.task('injectDev', function () {
    var vendorStream = gulp.src('./' + config.temp + '/vendor/*.js', {read: false});
    var appStream = gulp.src('./' + config.temp + '/app/*.js', {read: false});
    var vendorCss = gulp.src('./' + config.temp + '/vendor/*.css', {read: false});
    var appCss = gulp.src('./' + config.temp + '/app/*.css', {read: false});

    return gulp.src(config.root + '/index.html')
        .pipe(inject(es(vendorStream, appStream), {name: 'scripts'}))
        .pipe(inject(es(vendorCss, appCss), {name: 'styles'}))
        .pipe(gulp.dest(config.root));
});
gulp.task('injectBuild', function () {
    var vendorStream = gulp.src('./' + config.dist + '/vendor/*.js', {read: false});
    var appStream = gulp.src('./' + config.dist + '/app/*.js', {read: false});
    var vendorCss = gulp.src('./' + config.dist + '/vendor/*.css', {read: true});
    var appCss = gulp.src('./' + config.dist + '/app/*.css', {read: false});

    return gulp.src(config.root + '/index.html')
        .pipe(inject(es(vendorStream, appStream), {
            name: 'scripts', transform: function (filepath) {
                return '<script src="' + filepath.replace('/' + config.dist, '.') + '"></script>'
            }
        }))
        .pipe(inject(es(vendorCss,appCss ), {
            name: 'styles', transform: function (filepath) {
                return '<link href="' + filepath.replace('/' + config.dist, '.') + '" rel="stylesheet">'
            }
        }))
        .pipe(gulp.dest(config.dist));
});



gulp.task('copyBuild', function () {
    return gulp.src([config.temp + '/**/*.*'
        ])
        .pipe(gulp.dest(config.dist))
})
gulp.task('copyRelease', function () {

    return gulp.src(config.temp + '/**/*.*')
        .pipe(rename(function (path) {
            path.dirname = 'release';
            path.basename = config.appName + '.min';
        }))
        .pipe(gulp.dest(config.scriptRelease))

});
gulp.task('webServer', function () {
    webserver.init({
        startPath: '/' + config.root,
        server: {
            baseDir: config.serve,
        },
        files: [config.temp + '/**/*.{js,html,css}']
    });
    gulp.watch(config.root + '/**/*.{js,html}', ["compileApplicationScripts"])
        .on('change', function (file) {
            console.info('Changed:' + file.path);
        });
    gulp.watch(config.root + '/**/*.scss', ["compileAppSaas"])
        .on('change', function (file) {
            console.log('Changed:' + file.path);
        });

});

gulp.task('start', function (cb) {
    gulpSync(
        'clean',
        'compileApplicationScripts',
        'bundleVendorScripts',
        'compileVendorSaas',
        'compileAppSaas',
        'copyIcons',
        'copyImages',
        'injectDev',
        'webServer', cb)
});

gulp.task('build', function (cb) {

    if (argv.env === 'release') {
        gulpSync(
            'clean',
            'compileApplicationScripts',
            'compileAppSaas',
            'copyRelease', cb)
    }
    else {
        gulpSync(
            'clean',
            'compileApplicationScripts',
            'bundleVendorScripts',
            'compileVendorSaas',
            'compileAppSaas',
            'copyIcons',
            'copyImages',
            'copyBuild',
            'injectBuild',
            cb)
    }
});



