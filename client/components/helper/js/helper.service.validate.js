;(function(){
    'use strict';

    angular 
        .module( 'Helper' )
        .service( 'ValidatorService', ValidatorService );

    ValidatorService.$inject = [];

    function ValidatorService(){
        return {
            username    : username,
            password    : password
        };

        /**
         * 验证用户名
         * @param {String} name - 要验证的用户名
         * @returns {Boolean} - 符合规则返回真,否则返回假
         */
        function username( name ){
            var regex = /^[a-zA-Z0-9]{6,20}$/;
            return regex.test( name );
        }

        /**
         * 验证密码
         * @param {String} passwd - 要验证的密码
         * @returns {Boolean} - 符合规则返回真,否则返回假
         */
        function password( passwd ){
            var regex = /^[a-zA-Z0-9]{6,20}$/;
            return regex.test( passwd );
        }
    }
})();
