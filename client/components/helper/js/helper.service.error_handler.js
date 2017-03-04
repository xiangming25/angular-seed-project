;(function(){
    'use strict';

    angular
        .module( 'Helper' )
        .service( 'ErrorHandler', ErrorHandler );

    ErrorHandler.$inject = [ 'Code', '$state' ];

    function ErrorHandler( Code, $state ){
        return function( response, cb ){
            switch( response.code ){
                case Code.SUCCESS:
                    cb( response );
                    break;
                case Code.AUTH_FAILED:
                    $state.go('Signin');
                    break;
                default:
                    cb( response );
            }
        };
    }
})();
