'use strict';

var buildTask = function( gulp, plugins, config, helper ){
    // 除开发阶段，其他阶段都要进行文件hash
    var isNotDevelop = config.stage !== 'develop';
    var destDir = config.less.destDir;
    if( isNotDevelop ){
	destDir = config.less.tmpDir;
    }

    var srcArray = [];

    config.less.noNeedBuildFolder.map( function( folder ){
        srcArray.push( config.less.srcDir + '/!(' + folder + ')/' );
        srcArray.push( config.less.srcDir + '/**/*.less' );
        srcArray.push( config.less.srcDir + '/**/*.css' );
    });

    return gulp.src( srcArray )
               // .pipe( plugins.debug({title : 'css'} ) )
               // .pipe( plugins.cache() )
               .pipe( plugins.less() )
               .pipe( plugins.autoprefixer() )
               .pipe( plugins.cssnano({
		   zindex: false
	       }) )
               .pipe( gulp.dest( destDir ) );
};

module.exports = buildTask;
