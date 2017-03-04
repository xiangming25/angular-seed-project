describe( 'components/helper/helper.service.validator.js', function(){
    'use strict';

    var ValidatorService;

    beforeEach( module( 'Helper' ) );

    beforeEach( inject( function( _ValidatorService_ ){
        ValidatorService = _ValidatorService_;
    }) );

    it( '用户名验证器应该已定义', function(){
        expect( ValidatorService ).toBeDefined();
    });

    describe( 'username()', function(){
         
        it( '用户名验证器应该已定义', function(){
            expect( ValidatorService.username ).toBeDefined();
        });

        it( '用户名应该要在6-20位之间,由数字,字母组成', function(){
            var username = 'wanglei';
            expect( ValidatorService.username( username ) ).toBe( true );

            username = 'wang';
            expect( ValidatorService.username( username ) ).toBe( false );
        });
    });

    describe( 'password()', function(){

        it( '密码验证器应该已定义', function(){
            expect( ValidatorService.password ).toBeDefined();
        });

        it( '密码应该要在6-20位之间,由数字,字母组成', function(){
            var password = 'wanglei';
            expect( ValidatorService.password( password ) ).toBe( true );

            password = '12345';
            expect( ValidatorService.password( password ) ).toBe( false );
        });
    });

});
