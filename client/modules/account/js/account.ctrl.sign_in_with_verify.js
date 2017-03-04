/**
 * 需要图形短信验证码登录
 */
;(function(){
    'use strict';

    angular
        .module( 'App.Account' )
        .controller( 'SignInWithVerifyCtrl', SignInWithVerifyCtrl );

    SignInWithVerifyCtrl.$inject = [ 'AccountService', 'ErrorHandler', 'ToolsService', 'Code', '$state', 'localStorageService','md5', '$interval' ];

    function SignInWithVerifyCtrl( AccountService, ErrorHandler, ToolsService, Code, $state, localStorageService, md5, $interval ){
        // jshint validthis: true
        var vm                  = this;
        vm.signIn               = signIn;
        vm.getImgVerifyCode     = getImgVerifyCode;
        vm.getPhoneVerifyCode   = getPhoneVerifyCode;
        
        var countStart          = 60;
        vm.count                = countStart;           // 倒計時開始時間

        vm.enterLogin = function(e) {
            if (e.keyCode == 13) signIn();
        };

        init();

        function init(){
            vm.getImgVerifyCode();
        }

        /**
         * 登录
         */
        function signIn() {
            if(typeof vm.username === 'string') vm.username = vm.username.trim();
            if(typeof vm.password === 'string') vm.password = vm.password.trim();
            if( typeof vm.phoneVerifyCode !== 'undefined' ) vm.phoneVerify = vm.phoneVerifyCode.trim();
            if( !vm.username ) {
                vm.errMsg = '用户名不能为空!';
                return false;
            }
            if( !vm.password ) {
                vm.errMsg = '密码不能为空!';
                return false;
            }
            if( !vm.phoneVerifyCode ){
                vm.errMsg = 'phone verifycode not found!';
                return false;
            }

            var params = {
                username: vm.username,
                verifyCode  : vm.phoneVerifyCode,
                password: md5.createHash(vm.password+ 'yhhx')
            };
            AccountService.signIn(params)
            .then(function(res) {
                if (res.code === Code.SUCCESS) {
                    localStorageService.set('username', vm.username);
                    $state.go('App.potential');
                }else if(res.code === Code.AUTH_FAILED) {
                    vm.errMsg = '用户名或密码错误!';
                }
            });
        }

        /**
         * get image verifycode
         */
        function getImgVerifyCode(){
            AccountService.getImgVerifyCode()
            .then( function( res ){
                if( res.code === Code.SUCCESS ){
                    vm.imgVerifyCode = 'data:image/jpeg;charset=utf-8;base64,' + res.data.img;
                }
            });
        }

        /**
         * get phone verifycode
         */
        function getPhoneVerifyCode(){
            if( vm.username && vm.imgVerifyCodeStr && vm.count === countStart ){
                var params = {
                    phone       : vm.username,
                    verifyCode  : vm.imgVerifyCodeStr
                };
                AccountService.getPhoneVerifyCode( params )
                .then( function( res ){
                    if( res.code === Code.SUCCESS ){
                        console.log( 'get phone verify code success' );
                    }else{
                        console.log( 'get phone verify code failed' );
                    }
                });
                // countdown 60s
                ToolsService.countdown( countStart, 1, 1000, vm );
            }
        }

        /**
         * countdown function
         * @params {Number} count   - count start
         * @params {Number} step    - each count 
         * @params {Number} timeInterval - each execute interval
         * @params {Object} obj     - must have a attribute of count, used for transfer value outside function
         */
        /*
        function countdown( count, step, timeInterval, obj ){
            var countStart = count;

            count -= step;
            obj.count = count;
            if( count > 0 ){
                var interval = $interval( function(){
                    if( count === 0 ){
                        $interval.cancel( interval );
                        interval = undefined;
                        obj.count = countStart;
                    }
                    count -= step;
                    obj.count = count;
                }, timeInterval );
            }
        }
        */
    }
})();
