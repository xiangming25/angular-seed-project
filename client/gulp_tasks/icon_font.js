'use strict';

var copyTask = function( gulp, plugins, config, helper ){
    return gulp.src( config.iconFonts.srcDir + '/**/*' )
               .pipe( gulp.dest( config.iconFonts.destDir ) );
};

module.exports = copyTask;
