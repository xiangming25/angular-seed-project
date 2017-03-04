;(function(){
    'use strict';

    angular
        .module( 'App.Const' )
        .constant( 'Code', {
            SUCCESS         : 10000,
            AUTH_FAILED     : 10001,
            AUTH_PASSED     : 10002,
            PERMISSION_ERROR: 10003,
            NO_SUITABLE_USER: 10004,
            NO_SUCH_PLAN    : 10005,
            CANT_CANCLE_PLAN: 10006,
            CANT_EDIT_PLAN  : 10007,
            NONE_OF_DATAL   : 10010
        });
})();
