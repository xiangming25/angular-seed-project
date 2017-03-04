'use strict';

// ******************************************
//
// 用于gulp任务的辅助工具
//
// ******************************************
//
// Available method:
//  getFolders
//
// ******************************************

const fs    = require( 'fs' );
const path  = require( 'path' );

var gulpTools = {
    /**
     * 获取指定目录或者目录数组下的所有子目录
     * @params [string] dir 指定的目录或者目录构成的数组
     */
    getFolders : function( dir ){
        var folders = [];
        if( dir instanceof Array ){
            try{
                dir.map( function( eachDir ){
                    folders.concat( fs.readdirSync( eachDir )
                    .filter( function( file ){
                        return fs.statSync( path.join( dir, file ) ).isDirectory();
                    }) );
                });
            }catch( e ){
                console.log( e );
            }
        }else{
            try{
                folders = fs.readdirSync( dir )
                .filter( function( file ){
                    return fs.statSync( path.join( dir, file ) ).isDirectory();
                });
            }catch( e ){
                console.log( e );
            }
        }
        return folders;
    }
};

module.exports = gulpTools;
