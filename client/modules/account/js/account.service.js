;(function(){
    'use strict';

    angular
        .module( 'App.Account' )
        .service( 'AccountService', AccountService );

    AccountService.$inject = [ '$http' ];

    function AccountService( $http ){
        return {
            signIn              : signIn,
            getImgVerifyCode    : getImgVerifyCode,
            getPhoneVerifyCode  : getPhoneVerifyCode,
        };

        /**
         * signIn
         * @params {String} username - username
         * @params {String} password - user password after md5
         */
        function signIn( params ){
            return $http.post( '/api/sign_in/', params )
            .then( function( response ){
                return response.data;
            });
        }

        /**
         * get image verify code 
         */
        function getImgVerifyCode(){
            return $http.get( '/api/verify_pic/' )
            .then( function( response ){
                return response.data;
            });
        }

        /**
         * get phone verify code
         */
        function getPhoneVerifyCode( params ){
            return $http.post( '/api/sms/', params )
            .then( function( response ){
                return response.data;
            });
        }
    }
})();
