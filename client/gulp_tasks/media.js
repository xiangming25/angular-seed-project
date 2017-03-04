'use strict';

var copyVideoTask = function( gulp, plugins, config, helper ){
    return gulp.src( config.video.srcDir + '/**/*' )
               .pipe( gulp.dest( config.video.destDir ) );
};

module.exports = {
    video   : copyVideoTask
};
