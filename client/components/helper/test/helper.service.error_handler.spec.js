describe( 'components/helper/helper.service.error_handler.js', function(){
    'use strict';

    var ErrorHandler,
        $state;

    beforeEach( module( 'Helper' ) );
    beforeEach( module( 'App.Const' ) );
    beforeEach( module( 'ui.router' ) );
    beforeEach( inject( function( _ErrorHandler_, _$state_){
        ErrorHandler = _ErrorHandler_;
        $state = _$state_;

        spyOn($state, 'go');
    }) );
    describe( 'ErrorHandler()', function(){
        it( '应该已经定义错误处理函数', function(){
            expect( ErrorHandler ).toBeDefined();
        });

        it( 'code=10000,应该直接触发回调,由后续函数处理', function(){
            var response = {
                code    : 10000,
                msg     : 'success'
            };

            var invokeCallback = false;

            ErrorHandler( response, function( res ){
                invokeCallback = true;
            });

            expect( invokeCallback ).toBe( true );
        });

        it( 'code=20001,应该触发回调', function(){
            var response = {
                code    : 20001,
                msg     : 'error'
            };

            var invokeCallback = false;

            ErrorHandler( response, function( res ){
                invokeCallback = true;
            });

            expect( invokeCallback ).toBe( true );
        });
    });

});
