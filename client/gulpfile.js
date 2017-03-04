'use strict';

// ********************************************************
//                                                       
// Gulpfile                                     
//                                                       
// ********************************************************

// ********************************************************
//
// Available tasks:
//  `gulp`
//  `gulp image`
//  `gulp style`
//  `gulp vender`
//  `gulp image:build`
//  `gulp image:hash`
// 
// ********************************************************

const baseDir	    = '.';
const gulp          = require( 'gulp' );
const KarmaServer   = require( 'karma' ).Server;
const path          = require( 'path' );
const plugins       = require( 'gulp-load-plugins' )({
});
const protractor    = plugins.protractor.protractor;
const runSequence   = require( 'run-sequence' );
const browserSync   = require( 'browser-sync' ).create();
const reload        = browserSync.reload;

const config        = require( baseDir + '/.gulp.config' );
const helper        = require( baseDir + '/gulp_task_helper' );

/**
 * 获取任务
 * 参数长度为2，取自函数模块，或者不需要回调函数的对象模块
 * 参数长度为3，取自对象模块
 */
function getTask(){
    var arg = arguments;
    // 从函数模块中获取
    if( arg.length === 1 ){
        return require( baseDir + '/gulp_tasks/' + arg[0] )( gulp, plugins, config, helper );
    }
    else if( arg.length === 2 && typeof arg[1] === 'function'){
        return require( baseDir + '/gulp_tasks/' + arg[0] )( gulp, plugins, config, helper, arg[1] );
    }
    // 从对象模块中获取，并且不需要使用回调函数
    else if( arg.length === 2 && typeof arg[1] !== 'function' ){
        return require( baseDir + '/gulp_tasks/' + arg[0] )[arg[1]]( gulp, plugins, config, helper );
    }
    // 从对象模块中获取，并且需要使用回调函数
    else if( arg.length === 3 ){
        return require( baseDir + '/gulp_tasks/' + arg[0] )[arg[1]]( gulp, plugins, config, helper, arg[2] );
    }
}

gulp.task( 'style', function(){
    return getTask( 'style' );
});

gulp.task( 'image:build', function(){
    return getTask( 'image', 'build' );
});

gulp.task( 'image:hash', function(){
    return getTask( 'image', 'hash' );
});

gulp.task( 'vender:copy', function( cb ){
    return getTask( 'vender', 'copy', cb );
});

gulp.task( 'vender:build', function(){
    return getTask( 'vender', 'build' );
});

gulp.task( 'script', function(){
    return getTask( 'script' );
});

gulp.task( 'image', function( cb ){
    runSequence( 'image:build', 'image:hash', cb );
});

gulp.task( 'frontend_views:copy', function(){
    return getTask( 'frontend_views', 'copy' );
});

/**
 * 
 */
gulp.task( 'iconFont', function(){
    return getTask( 'icon_font' );
});

/*
gulp.task( 'video', function(){
    return getTask( 'media', 'video' );
});
*/

gulp.task( 'replace', function(){
    return getTask( 'replace' );
});

gulp.task( 'watch', function(){
    
    browserSync.init({
        proxy   : "127.0.0.1:8888",
        port    : 8802
    });

    gulp.watch([
        config.vender.srcDir + '/**/*'
    ], [ 'vender:copy', 'vender:build' ]);

    gulp.watch([
        config.images.srcDir + '/**/*',
    ], [ 'image' ] );

    gulp.watch([
        config.less.srcDir + '/**/*',
    ], [ 'style' ] );

    gulp.watch([
        config.js.modules.srcDir + '/**/js/*.js',
        config.js.components.srcDir + '/**/js/*.js',
    ], [ 'script' ] );

    gulp.watch([
        config.frontendViews.modules.srcDir + '/**/views/*.html',
        config.frontendViews.components.srcDir + '/**/views/*.html',
    ], [ 'frontend_views:copy' ] );

    gulp.watch( config.destDir + '/**/*' ).on( 'change', reload );

});

/**
 * 单元测试
 */
gulp.task( 'unit', function( done ){
    var karma = new KarmaServer({
        configFile : path.join( __dirname, 'karma.conf.js' ),
        singleRun : false
    }, done );

    karma.start();
});

/**
 * 端到端测试
 */
gulp.task( 'e2e', function(){
    var args = [ '--baseUrl', 'http://localhost:8001' ];

    gulp.src( [baseDir + '/modules/**/e2e/**/*.js'] )
    .pipe( protractor({
        configFile : path.join( __dirname, 'e2e_conf.js' ),
        args : args
    }) )
    .on( 'error', function( e ){
        throw e;
    });
});

gulp.task( 'default', function( cb ){
    config.stage = 'develop';
    // runSequence( [ 'vender:copy', 'style', 'vender:build', 'script', 'view:copy' ], 'replace', cb ); 
    runSequence( [ 'iconFont', 'image:build', 'vender:copy', 'style', 'vender:build', 'script', 'frontend_views:copy' ], 'watch', cb ); 
    // runSequence( [ 'style', 'vender:build', 'script' ], cb ); 
});

// build for test stage
gulp.task( 'bt', function( cb ){
    config.stage = 'test';
    config.useCdn = false;
    runSequence( [ 'iconFont', 'image', 'vender:copy', 'vender:build', 'style', 'script', 'frontend_views:copy' ], 'replace', cb ); 
});

// build for staging stage
gulp.task( 'bs', function( cb ){
    config.stage = 'staging';
    config.useCdn = false;
    runSequence( [ 'iconFont', 'image', 'vender:copy', 'vender:build', 'style', 'script', 'frontend_views:copy' ], 'replace', cb ); 
});

// build for product stage
gulp.task( 'bp', function( cb ){
    config.stage = 'product';
    config.useCdn = false;
    runSequence( [ 'iconFont', 'image', 'vender:copy', 'vender:build', 'style', 'script', 'frontend_views:copy' ], 'replace', cb ); 
});
