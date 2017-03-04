const app           = require( 'koa' )();
const router	    = require( './routes' );

var json = require('koa-json');

app
    .use( router.routes() )
    .use( router.allowedMethods() );

app.use(require('koa-static')(__dirname + '/client/public'));

app.use(require('koa-bodyparser')());

app.listen( 8888,'0.0.0.0' );
