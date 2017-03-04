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
        /^\/views\/.*\.jade$/g,
    ];

    // var dontUpdateReferenceArray = [
    //     /^\/video\/.*/g,
    // ];

    config.vender.noNeedCompressFolder.map( function( folder ){
        var reg = new RegExp( '^/vender/' +folder+ '/.*', 'g' );
        dontRenameFileArray.push( reg );
    });
    var revAll = new plugins.revAll({
        prefix: 'http://oduf2h89k.bkt.clouddn.com',
        dontGlobal : dontGlobalArray,
        dontRenameFile : dontRenameFileArray,
        // dontUpdateReference: dontUpdateReferenceArray,
        fileNameManifest : './.rev-manifest.json'
    });

    var jadeFilter = plugins.filter( '.tmpBuild/views/**.jade', { restore : true } );

    return gulp.src( [ config.destDir + '/**/*' ] )
               // .pipe( plugins.debug( { title : 'replace' } ) )
               .pipe( revAll.revision() )
               .pipe( jadeFilter )
               .pipe( plugins.debug( { title : 'jade' } ) )
               //.pipe( revdel() )
               .pipe( gulp.dest( '../' ) )
               .pipe( jadeFilter.restore )
               .pipe( plugins.debug( { title : 'others' } ) )
               .pipe( gulp.dest( config.destDir ) )
               .pipe( revAll.manifestFile() )
               .pipe( gulp.dest( '.' ) );
};

module.exports = replaceTask;
