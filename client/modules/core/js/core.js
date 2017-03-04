;(function(){
    'use strict';

    angular
        .module( 'App', [
            'ui.router',
            // 'ui.bootstrap',
            'angular-md5',
            'ngRap',
            'ngAnimate',
            'LocalStorageModule',
            'Helper',
            'App.Const',
            'App.Account',
        ] );
})();
