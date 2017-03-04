describe( 'modules/account.service.js', function(){
    'use strict';

    var AccountService,
        $httpBackend,
        Code;

    var signInUrl               = '/api/sign_in/',
        getImgVerifyCodeUrl     = '/api/verify_pic/',
        getPhoneVerifyCodeUrl   = '/api/sms/';

    jasmine.getJSONFixtures().fixturesPath = 'base/json_data/';

    var signInData          = getJSONFixture( 'account/sign_in.json' ),
        imgVerifyCodeData   = getJSONFixture( 'account/img_verify_code.json' ),
        phoneVerifyCodeData = getJSONFixture( 'account/phone_verify_code.json' );

    beforeEach( module( 'App.Account' ) );
    beforeEach( module( 'App.Const' ) );

    beforeEach( inject( function( _AccountService_, _$httpBackend_, _Code_ ){
        AccountService  = _AccountService_;
        $httpBackend    = _$httpBackend_;
        Code            = _Code_;

        $httpBackend.whenPOST( signInUrl ).respond( signInData );
        $httpBackend.whenGET( getImgVerifyCodeUrl ).respond( imgVerifyCodeData );
        $httpBackend.whenPOST( getPhoneVerifyCodeUrl ).respond( phoneVerifyCodeData );
    }) );

    it( 'should have defined AccountService', function(){
        expect( AccountService ).toBeDefined();
    });

    describe( 'signIn()', function(){
        it( 'should have defined signIn function', function(){
            expect( AccountService.signIn ).toBeDefined();
        });
    
        it( 'should success when signIn with expected data', function(){
            var returnData = null;
            var params = {
                username    : 'terminator',
                password    : '12345678'
            };
    
            AccountService.signIn( params )
            .then( function( response ){
                returnData = response;
            });

            $httpBackend.flush();
    
            expect( returnData.code ).toEqual( Code.SUCCESS );
        });
    });

    describe( 'getImgVerifyCode()', function(){
        it( 'should have defined signIn getImgVerifyCode', function(){
            expect( AccountService.getImgVerifyCode ).toBeDefined();
        });

        it( 'should success when getImgVerifyCode with expected data', function(){
            var returnData = null;
    
            AccountService.getImgVerifyCode()
            .then( function( response ){
                returnData = response;
            });
    
            $httpBackend.flush();
    
            expect( returnData.code ).toEqual( Code.SUCCESS );
        });
    });

    describe( 'getPhoneVerifyCode()', function(){
        it( 'should have defined signIn getPhoneVerifyCode', function(){
            expect( AccountService.getPhoneVerifyCode ).toBeDefined();
        });
        it( 'should success when getPhoneVerifyCode with expected data', function(){
            var returnData = null;

            var params = {
                phone       : '15008271842',
                verifyCode  : '1234'
            };
    
            AccountService.getPhoneVerifyCode()
            .then( function( response ){
                returnData = response;
            });
    
            $httpBackend.flush();
    
            expect( returnData.code ).toEqual( Code.SUCCESS );
        });

    });

});
