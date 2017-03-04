;(function(){
    'use strict';

    angular
        .module( 'Helper' )
        .service( 'ToolsService', ToolsService );

    ToolsService.$inject = [ '$interval' ];

    function ToolsService( $interval ){
        return {
            countdown   : countdown
        };

        /**
         * countdown function
         * @params {Number} count   - count start
         * @params {Number} step    - each count 
         * @params {Number} timeInterval - each execute interval
         * @params {Object} obj     - must have a attribute of count, used for transfer value outside function, usually obj is vm 
         */
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
                    }else{
                        count -= step;
                        obj.count = count;
                    }
                }, timeInterval );
            }
        }
    }
})();
