'use strict';

const path  = require( 'path' );
const merge = require( 'merge-stream' );

/**
 * 针对只需要拷贝一次，不需要监视修改的文件进行处理，单独处理一次，
 * 之后不再监视，可以加快每次监视build时间，通常都是一些成熟的库文件
 */
var copyTask = function( gulp, plugins, config, helper, cb ){
    var venderFolders = helper.getFolders( config.vender.srcDir );

    var needCopyFoldersInVender = venderFolders.filter( function( folder ){
        return ( config.vender.noNeedCompressFolder.indexOf( folder ) !== -1 );
    });

    if( needCopyFoldersInVender.length ){
        var tasks = needCopyFoldersInVender.map( function( folder ){
            return gulp.src( path.join( config.vender.srcDir, folder, '/**/*' ) )
                       // .pipe( debug( { title : 'copyToVender' } ) )
                       .pipe( gulp.dest( path.join( config.vender.destDir , folder ) ) );
        });

        return merge( tasks );
    }else{
        return cb();
    }
};

var buildTask = function( gulp, plugins, config, helper ){
    // 除开发阶段，其他阶段都要进行代码压缩
    var needUglify      = config.stage !== 'develop',
        // 在测试和预发布环境都要保留sourcemaps，以便调试时候查看源代码
        needSourcemaps  = ( config.stage === 'test' || config.stage === 'staging' );

    // 除开发阶段，其他阶段都要进行文件hash
    var isNotDevelop = config.stage !== 'develop';

    var destDir = config.vender.destDir;
    if( isNotDevelop ){
	destDir = config.vender.tmpDir;
    }

    var venderFolders = helper.getFolders( config.vender.srcDir );

    var needBuildFoldersInVender = venderFolders.filter( function( folder ){
        return ( config.vender.noNeedCompressFolder.indexOf( folder ) === -1 );
    });

    var tasks = needBuildFoldersInVender.map( function( folder ){
        return gulp.src( path.join( config.vender.srcDir, folder, '/**/*.js' ) )
        // .pipe( plugins.jshint() )
        // .pipe( plugins.jshint.reporter( 'default', { verbose : 'true' } ) )
        // .pipe( debug( { title : 'buildJsToVender' } ) )
        .pipe( plugins.concat( folder + '.js' ) )
        .pipe( plugins.if( needSourcemaps, plugins.sourcemaps.init() ) )
        .pipe( plugins.if( needUglify , plugins.ngAnnotate() ) )
        .pipe( plugins.if( needUglify , plugins.uglify() ) )
        .pipe( plugins.if( needSourcemaps, plugins.sourcemaps.write( './' ) ) )
        .pipe( gulp.dest( destDir ) );
    });

    var fileProcess = gulp.src( path.join( config.vender.srcDir, '/*.js' ) )
                    .pipe( plugins.if( needSourcemaps, plugins.sourcemaps.init() ) )
                    .pipe( plugins.if( needUglify , plugins.uglify() ) )
                    .pipe( plugins.if( needSourcemaps, plugins.sourcemaps.write( './' ) ) )
                    .pipe( gulp.dest( destDir ) );

    if( needBuildFoldersInVender.length ){
        return merge( tasks, fileProcess );
    }else{
        return fileProcess;
    }
};

module.exports = {
    copy    : copyTask,
    build   : buildTask
};
