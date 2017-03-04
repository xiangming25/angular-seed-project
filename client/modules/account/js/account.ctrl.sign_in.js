;(function(){
    'use strict';

    angular
        .module( 'App.Account' )
        .controller( 'SignInCtrl', SignInCtrl );

    SignInCtrl.$inject = ['AccountService', 'ErrorHandler', 'Code', '$state', 'localStorageService','md5'];

    function SignInCtrl(AccountService,ErrorHandler,Code,$state,localStorageService,md5){
        // jshint validthis: true
        var vm = this;
        vm.signIn = signIn;
        vm.enterLogin = function(e) {
            if (e.keyCode == 13) signIn();
        };

        /**
         * 登录
         */
        function signIn() {
            if(typeof vm.username === 'string') vm.username = vm.username.trim();
            if(typeof vm.password === 'string') vm.password = vm.password.trim();

            if(!vm.username) {
                vm.errMsg = '用户名不能为空!';
                return false;
            }
            if(!vm.password) {
                vm.errMsg = '密码不能为空!';
                return false;
            }

            var params = {
                username    : vm.username,
                password    : md5.createHash(vm.password+ 'yhhx')
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
    }
})();
