'use strict';

var replaceTask = function( gulp, plugins, config, helper ){
    var dontGlobalArray = [
        /^\/assets\/[^/]*\/.*\.map$/g,
        /^\/assets\/[^/]*\/.*\.md$/g,
        /^\/vender\/[^/]*\/.*\.map$/g,
        /^\/vender\/.*\.map$/g,
        /^\/vender\/[^/]*\/.*\.md$/g,
    ];

    var dontRenameFileArray = [
        /^\/templates\/modules\/core\/frame\.tpl\.html$/g,
    ];

    // var dontUpdateReferenceArray = [
    //     /^\/video\/.*/g,
    // ];

    /*
    config.vender.noNeedCompressFolder.map( function( folder ){
        var reg = new RegExp( '^/vender/' +folder+ '/.*', 'g' );
        dontRenameFileArray.push( reg );
    });
    */
    var revAllConfig = {
        prefix: '',
        dontGlobal : dontGlobalArray,
        dontRenameFile : dontRenameFileArray,
        // dontUpdateReference: dontUpdateReferenceArray,
        fileNameManifest : config.baseDir + '/.rev-manifest.json'
    }
    if( config.useCdn ){
	revAllConfig.prefix = config.cdnDomain;
    }
    var revAll = new plugins.revAll( revAllConfig );

    return gulp.src([ 
                    config.tmpDir + '/**/*',
                ])
                .pipe( revAll.revision() )
                .pipe( gulp.dest( config.destDir ) )
                .pipe( revAll.manifestFile() )
                .pipe( gulp.dest( '.' ) );
};

module.exports = replaceTask;
