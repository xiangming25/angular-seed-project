'use strict';

// process backend view, such as jade, ejs, jsp

var copyTask = function( gulp, plugins, config, helper, cb ){
    return gulp.src( config.views.srcDir + '/**/*.jade' )
               // .pipe( plugins.debug( { title: 'view' } ) )
               .pipe( gulp.dest( config.views.destDir ) );
};

module.exports = {
    copy    : copyTask
};
