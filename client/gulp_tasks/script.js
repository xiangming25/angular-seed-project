'use strict';

const path  = require( 'path' );
const merge = require( 'merge-stream' );

/**
 * 非js库和引用第三方插件的js文件，需要build，并且每次监视到修改都需要重新build
 */
var buildTask = function( gulp, plugins, config, helper ){
    // 除开发阶段，其他阶段都要进行代码压缩
    var needUglify      = config.stage !== 'develop',
        // 在测试和预发布环境都要保留sourcemaps，以便调试时候查看源代码
        needSourcemaps  = ( config.stage === 'test' || config.stage === 'staging' );

    var modulesDestDir	    = config.js.modules.destDir,
	componentsDestDir   = config.js.components.destDir;
    // 除开发阶段，其他阶段都需要进行文件hash，所以要使用中间目录
    if( needUglify ){
	modulesDestDir	    = config.js.modules.tmpDir;
	componentsDestDir   = config.js.components.tmpDir;
    }

    var modulesJsFolders = [];
    modulesJsFolders = helper.getFolders( config.js.modules.srcDir );

    var modulesJsTasks = modulesJsFolders.map( function( folder ){
        return gulp.src([
            path.join( config.js.modules.srcDir, folder, '/js/' + folder + '.js' ), 
            path.join( config.js.modules.srcDir, folder, '/js/!(' + folder + ').js' ) 
        ], { base : './' })
        // .pipe( plugins.debug( { title : 'buildJsToAssets' } ) )
        .pipe( plugins.jshint() )
        .pipe( plugins.jshint.reporter( 'default', { verbose : 'true' } ) )
        .pipe( plugins.concat({ path : folder + '.js' }) )
        .pipe( plugins.if( needSourcemaps, plugins.sourcemaps.init() ) )
        .pipe( plugins.ngAnnotate() )
        .pipe( plugins.if( needUglify , plugins.uglify() ) )
        .pipe( plugins.if( needSourcemaps, plugins.sourcemaps.write( './' ) ) )
        .pipe( gulp.dest( modulesDestDir ) );
    });

    var componentsJsFolders = [];
    componentsJsFolders = helper.getFolders( config.js.components.srcDir );

    var componentsJsTasks = componentsJsFolders.map( function( folder ){
        return gulp.src([
            path.join( config.js.components.srcDir, folder, '/js/' + folder + '.js' ),
            path.join( config.js.components.srcDir, folder, '/js/!(' + folder + ').js' ) 
        ], { base : './' })
        .pipe( plugins.jshint() )
        .pipe( plugins.jshint.reporter( 'default', { verbose : 'true' } ) )
        .pipe( plugins.concat({ path : folder + '.js'}) )
        .pipe( plugins.if( needSourcemaps, plugins.sourcemaps.init() ) )
        .pipe( plugins.ngAnnotate() )
        .pipe( plugins.if( needUglify, plugins.uglify() ) )
        .pipe( plugins.if( needSourcemaps, plugins.sourcemaps.write( './' ) ) )
        .pipe( gulp.dest( componentsDestDir ) );
    });

    return merge( modulesJsTasks, componentsJsTasks );
};

module.exports = buildTask;
