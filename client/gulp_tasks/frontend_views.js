'use strict';

const path  = require( 'path' );
const merge = require( 'merge-stream' );

var copyTask = function( gulp, plugins, config, helper, cb ){
    // 除开发阶段，其他阶段都要进行文件hash
    var isNotDevelop = config.stage !== 'develop';

    var modulesDestDir	    = config.frontendViews.modules.destDir,
	componentsDestDir   = config.frontendViews.components.destDir;
    if( isNotDevelop ){
	modulesDestDir	    = config.frontendViews.modules.tmpDir;
	componentsDestDir   = config.frontendViews.components.tmpDir;
    }

    var modulesFrontendViewsFolders = [];
    modulesFrontendViewsFolders = helper.getFolders( config.frontendViews.modules.srcDir );

    var modulesFrontendViewsTasks = modulesFrontendViewsFolders.map( function( folder ){
        return gulp.src([
            path.join( config.frontendViews.modules.srcDir, folder, '/views/*.tpl.html' ), 
        ])
        .pipe( gulp.dest( path.join( modulesDestDir, folder ) ) );
    });

    var componentsFrontendViewsFolders = [];
    componentsFrontendViewsFolders = helper.getFolders( config.frontendViews.components.srcDir );

    var componentsFrontendViewsTasks = componentsFrontendViewsFolders.map( function( folder ){
        return gulp.src([
            path.join( config.frontendViews.components.srcDir, folder, '/views/*.tpl.html' ), 
        ])
        .pipe( gulp.dest( path.join( componentsDestDir, folder ) ) );
    });

    return merge( modulesFrontendViewsTasks, componentsFrontendViewsTasks );
};

module.exports = {
    copy    : copyTask
};
