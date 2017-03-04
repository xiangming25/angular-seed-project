describe( 'modules/account.ctrl.sign_in_with_verify.js', function(){
    'use strict';

    var SignInWithVerifyCtrl,
        AccountService,
        ToolsService,
        Code,
        $state,
        ErrorHandler,
        localStorageService,
        $controller,
        scope,
        countStart  = 60;

    jasmine.getJSONFixtures().fixturesPath = 'base/json_data/';

    var signInData          = getJSONFixture( 'account/sign_in.json' ),
        imgVerifyCodeData   = getJSONFixture( 'account/img_verify_code.json' ),
        phoneVerifyCodeData = getJSONFixture( 'account/phone_verify_code.json' );

    beforeEach( module( 'App.Account' ) );
    beforeEach( module( 'App.Const' ) );
    beforeEach( module( 'ui.router' ) );
    beforeEach( module( 'LocalStorageModule' ) );
    beforeEach( module( 'angular-md5' ) );
    beforeEach( module( 'Helper' ) );

    // 模拟factory返回数据
    beforeEach( module( function( $provide ){
        $provide.decorator( 'ErrorHandler', function( $delegate ){
            ErrorHandler = jasmine.createSpy( 'ErrorHandler', $delegate ).and.callThrough();
            return ErrorHandler;
        });
    }) );

    beforeEach( inject( function( _AccountService_, _ToolsService_, _Code_, _$state_, _localStorageService_, _$controller_, $q, $rootScope ){
        AccountService      = _AccountService_;
        ToolsService        = _ToolsService_;
        Code                = _Code_;
        $state              = _$state_;
        localStorageService = _localStorageService_;
        $controller         = _$controller_;

        spyOn( $state, 'go' );

        /*
        spyOn( AccountService, 'getImgVerifyCode' ).and.callFake( function(){
            var deferred = $q.defer();
            deferred.resolve( imgVerifyCodeData );
            return deferred.promise;
        });
        */
        spyOn( AccountService, 'getImgVerifyCode' ).and.callFake( function(){
            var deferred = $q.defer();
            deferred.resolve( imgVerifyCodeData );
            return deferred.promise;
        });
        spyOn( AccountService, 'getPhoneVerifyCode' ).and.callFake( function(){
            var deferred = $q.defer();
            deferred.resolve( phoneVerifyCodeData );
            return deferred.promise;
        });
        spyOn( AccountService, 'signIn' ).and.callFake( function(){
            var deferred = $q.defer();
            deferred.resolve( signInData );
            return deferred.promise;
        });
        spyOn( ToolsService, 'countdown' ).and.callThrough();

        scope                   = $rootScope.$new();
        SignInWithVerifyCtrl    = $controller( 'SignInWithVerifyCtrl', {
            $scope   : scope
        });
    }) );

    it( 'should defined SignInWithVerifyCtrl', function(){
        expect( SignInWithVerifyCtrl ).toBeDefined();
    });

    describe( 'init()', function(){
        it( 'should defined getImgVerifyCode', function(){
            expect( SignInWithVerifyCtrl.getImgVerifyCode ).toBeDefined();
        });

        it( 'should invoked getImgVerifyCode', function(){
            scope.$apply();
            expect( AccountService.getImgVerifyCode ).toHaveBeenCalled();
        });
    });

    describe( 'signIn()', function(){
        it( 'should defined signIn', function(){
            expect( SignInWithVerifyCtrl.signIn ).toBeDefined();
        });
        
        it( 'should not post request when username or password is empty or phoneVerifyCode not found', function(){
            SignInWithVerifyCtrl.username = '';
            SignInWithVerifyCtrl.password = '12345678';
            SignInWithVerifyCtrl.signIn();
            expect( AccountService.signIn ).not.toHaveBeenCalled();

            SignInWithVerifyCtrl.username = 'terminator';
            SignInWithVerifyCtrl.password = '';
            SignInWithVerifyCtrl.signIn();
            expect( AccountService.signIn ).not.toHaveBeenCalled();

            SignInWithVerifyCtrl.username         = 'terminator';
            SignInWithVerifyCtrl.password         = '12345678';
            SignInWithVerifyCtrl.signIn();
            expect( AccountService.signIn ).not.toHaveBeenCalled();
        });

        it( 'should post request when username and password is valid', function(){
            SignInWithVerifyCtrl.username         = 'terminator';
            SignInWithVerifyCtrl.password         = '12345678';
            SignInWithVerifyCtrl.phoneVerifyCode  = '2368';
            SignInWithVerifyCtrl.signIn();
            scope.$apply();
            expect( AccountService.signIn ).toHaveBeenCalled();
        });
    });

    describe( 'getImgVerifyCode()', function(){
        it( 'should defined getImgVerifyCode', function(){
            expect( SignInWithVerifyCtrl.getImgVerifyCode ).toBeDefined();
        });

        it( 'should get verify code image', function(){
            expect( SignInWithVerifyCtrl.imgVerifyCode ).toBeUndefined();
            SignInWithVerifyCtrl.getImgVerifyCode();
            scope.$apply();
            expect( SignInWithVerifyCtrl.imgVerifyCode ).toBeDefined();
        });
    });

    describe( 'getPhoneVerifyCode()', function(){
        it( 'should defined getPhoneVerifyCode', function(){
            expect( SignInWithVerifyCtrl.getPhoneVerifyCode ).toBeDefined();
        });
         
        it( 'should not post request when count not equal to init countStart', function(){
            SignInWithVerifyCtrl.count = countStart - 1;
            SignInWithVerifyCtrl.getPhoneVerifyCode();
            scope.$apply();
            expect( AccountService.getPhoneVerifyCode ).not.toHaveBeenCalled();
        });
          
        it( 'should post request when count equal to init countStart', function(){
            SignInWithVerifyCtrl.username = 'terminator';
            SignInWithVerifyCtrl.imgVerifyCodeStr = '3673';
            SignInWithVerifyCtrl.count = countStart;
            SignInWithVerifyCtrl.getPhoneVerifyCode();
            scope.$apply();
            expect( AccountService.getPhoneVerifyCode ).toHaveBeenCalled();
            expect( ToolsService.countdown ).toHaveBeenCalled();
        });
    });
});
