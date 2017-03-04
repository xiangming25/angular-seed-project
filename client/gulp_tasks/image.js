'use strict';

/**
 * build图片文件
 */
var buildTask = function( gulp, plugins, config ){
    // 除开发阶段，其他阶段都要进行文件hash
    var isNotDevelop = config.stage !== 'develop';

    var destDir = config.images.destDir;
    if( isNotDevelop ){
	destDir = config.images.tmpDir;
    }

    return gulp.src( config.images.srcDir + '/**/*' )
               .pipe( plugins.imagemin({
                   progressive : true,                 // for jpg images
                   optimizationLevel : 3,              // for png images
                   interlaced : true                   // for gif images
               }) )
               // .pipe( rev() )
               // .pipe( cache() )
               .pipe( gulp.dest( destDir ) );
};

/**
 * 图片文件hash处理并生成到public目录下
 * 必须后于buildTask执行
 */
var hashTask = function( gulp, plugins, config ){
    var revAll = new plugins.revAll({
        fileNameManifest : './.images-manifest.json'
    });

    return gulp.src( config.images.tmpDir + '/**/*' )
               .pipe( revAll.revision() )
               .pipe( gulp.dest( config.images.destDir ) )
               .pipe( revAll.manifestFile() )
               .pipe( gulp.dest( '.' ) );
};

module.exports = {
    build   : buildTask,
    hash    : hashTask
};
