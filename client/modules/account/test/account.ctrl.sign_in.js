describe( 'modules/account.ctrl.sign_in.js', function(){
    'use strict';

    var SignInCtrl,
        AccountService,
        $state,
        $controller,
        ErrorHandler,
        scope;

    jasmine.getJSONFixtures().fixturesPath = 'base/json_data/';

    var signInData          = getJSONFixture( 'account/sign_in.json' );

    beforeEach( module( 'App.Account' ) );
    beforeEach( module( 'App.Const' ) );
    beforeEach( module( 'ui.router' ) );
    beforeEach( module( 'LocalStorageModule' ) );
    beforeEach( module( 'angular-md5' ) );
    beforeEach( module( 'Helper' ) );

    // 模擬factory返回函數 
    beforeEach( module( function( $provide ){
        $provide.decorator( 'ErrorHandler', function( $delegate ){
            ErrorHandler = jasmine.createSpy( 'ErrorHandler', $delegate ).and.callThrough();
            return ErrorHandler;
        });
    }) );

    beforeEach( inject( function( _AccountService_, _$controller_, $state, $q, $rootScope ){
        AccountService      = _AccountService_;
        $controller         = _$controller_;

        spyOn( $state, 'go' );

        spyOn( AccountService, 'signIn' ).and.callFake( function(){
            var deferred = $q.defer();
            deferred.resolve( signInData );
            return deferred.promise;
        });

        scope   = $rootScope.$new();
        SignInCtrl = $controller( 'SignInCtrl', {
            $scope  : scope
        });
    }) );

    it( 'should defined SignInCtrl', function(){
        expect( SignInCtrl ).toBeDefined();
    });

    describe( 'signIn()', function(){
        it( 'should defined signIn', function(){
            expect( SignInCtrl.signIn ).toBeDefined();
        });

        it( 'should not post request when username or password is empty', function(){
            SignInCtrl.username = '';
            SignInCtrl.password = '123456';

            SignInCtrl.signIn();
            scope.$apply();
            expect( AccountService.signIn ).not.toHaveBeenCalled();

            SignInCtrl.username = 'terminator';
            SignInCtrl.password = '';

            SignInCtrl.signIn();
            scope.$apply();
            expect( AccountService.signIn ).not.toHaveBeenCalled();
        });

        it( 'should post request when username and password valid', function(){
            SignInCtrl.username = 'terminator';
            SignInCtrl.password = '123456';

            SignInCtrl.signIn();
            scope.$apply();
            expect( AccountService.signIn ).toHaveBeenCalled();
        });
    });
});
