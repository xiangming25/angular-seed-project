const fs            = require( 'fs' );
const path          = require( 'path' );
const router        = require( 'koa-router' )();

router.get( '/', indexView );
router.get( '/signin', indexView );
router.get('/userPortrait_search',indexView);
router.get('/userPortrait_detail',indexView);

var readFileThunk = function(src) {
    return new Promise(function (resolve, reject) {
        fs.readFile(src, {
            'encoding': 'utf8'
        }, function (err, data) {
            if(err) return reject(err);
            resolve(data);
        });
    });
}

function* indexView( next ){
    var html = yield readFileThunk( path.join( __dirname, '/client/public/templates/modules/core/frame.tpl.html' ) );
    this.body = html;
}

module.exports = router;
