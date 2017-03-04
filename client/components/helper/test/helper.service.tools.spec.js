describe( 'components/helper/helper.service.validator.js', function(){
    'use strict';

    var ToolsService,
        $interval;

    beforeEach( module( 'Helper' ) );

    beforeEach( inject( function( _ToolsService_, _$interval_ ){
        ToolsService    = _ToolsService_;
        $interval       = _$interval_;
    }) );

    it( '工具工厂应该已定义', function(){
        expect( ToolsService ).toBeDefined();
    });

    describe( 'countdown()', function(){
         
        it( '定义', function(){
            expect( ToolsService.countdown ).toBeDefined();
        });

        it( 'should print right value', function(){
            var countStart = 5;
            var obj = { count : countStart };
            ToolsService.countdown( countStart, 1, 1000, obj );
            expect( obj.count ).toEqual( 4 );
            $interval.flush( 1000 );
            expect( obj.count ).toEqual( 3 );
            $interval.flush( 1000 );
            expect( obj.count ).toEqual( 2 );
            $interval.flush( 1000 );
            expect( obj.count ).toEqual( 1 );
            $interval.flush( 1000 );
            expect( obj.count ).toEqual( 0 );
            $interval.flush( 1000 );
            expect( obj.count ).toEqual( 5 );
        });
    });
});
