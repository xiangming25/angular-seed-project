'use strict';

const baseDir	= '.';
const destDir   = baseDir + '/public';
const tmpDir	= baseDir + '/.tmpBuild';

var config = {
    stage                   : 'develop',        // develop(开发阶段) --> test(测试阶段) --> staging(预发布阶段) --> product(生产阶段)
    baseDir		    : baseDir,
    destDir		    : destDir,
    tmpDir		    : tmpDir,
    // 生产部署时采用的cdn域名
    cdnDomain		    : 'http://oduf2h89k.bkt.clouddn.com',
    // 是否使用cdn
    useCdn		    : false,
    // 不需要进行处理的文件列表
    noNeedCompressFiles     : [
        'robots.txt'
    ],
    // 第三方文件处理路径
    vender      : {
        srcDir                  : baseDir + '/vender',
	tmpDir			: tmpDir + '/static/vender',
        destDir                 : destDir + '/static/vender',
        // vender目录下不需要处理的目录列表
        noNeedCompressFolder    : [
            'jquery',
            'jquery_mobile',
            'angular',
            'ui_bootstrap',
            'highcharts',
            'ueditor'
        ]
    },
    // 字体文件处理路径
    fonts       : {
        srcDir      : baseDir + '/fonts',
	tmpDir	    : tmpDir + '/static/assets/fonts',
        destDir     : destDir + '/static/assets/fonts'
    },
    // 字体图标文件处理路径
    iconFonts   : {
        srcDir      : baseDir + '/icon_fonts',
	tmpDir	    : tmpDir + '/static/assets/icon_fonts',
        destDir     : destDir + '/static/assets/icon_fonts'
    },
    // 字体svg文件处理
    iconSvgs    : {
        srcDir      : baseDir + '/icon_svgs', 
	tmpDir	    : tmpDir + '/static/assets/icon_svgs',
        destDir     : destDir + '/static/assets/icon_svgs'
    },
    // 图片文件与处理路径
    images      : {
        srcDir      : baseDir + '/images',
	tmpDir	    : tmpDir + '/static/assets/images',
        destDir     : destDir + '/static/assets/images'
    },
    // less文件与处理路径
    less        : {
        srcDir      : baseDir + '/less',
	tmpDir	    : tmpDir + '/static/assets/css',
        destDir     : destDir + '/static/assets/css',
        noNeedBuildFolder    : [
            'base'
        ]
    },
    // js文件与处理路径
    js          : {
        modules     : {
            srcDir      : baseDir + '/modules',
	    tmpDir	: tmpDir + '/static/assets/js/modules',
            destDir     : destDir + '/static/assets/js/modules',
        },
        components  : {
            srcDir      : baseDir + '/components',
	    tmpDir	: tmpDir + '/static/assets/js/components',
            destDir     : destDir + '/static/assets/js/components',
        }
    },
    // 视图文件与处理路径
    frontendViews        : {
        modules     : {
            srcDir      : baseDir + '/modules',
	    tmpDir	: tmpDir + '/templates/modules',
            destDir     : destDir + '/templates/modules',
        },
        components  : {
            srcDir      : baseDir + '/components',
	    tmpDir	: tmpDir + '/templates/components',
            destDir     : destDir + '/templates/components',
        }
    },
    // 后端模板文件，例如jade，ejs，jsp等
    backendViews        : {
        scrDir      : baseDir + '/views',
        destDir     : '../views',
    },
    // 多媒体资料，包括video，audio
    media               : {
        srcDir      : baseDir + '/media',
	tmpDir	    : tmpDir + '/static/media',
        destDir     : destDir + '/static/media',
    },
    video       : {
        srcDir      : baseDir + '/video',
	tmpDir	    : tmpDir + '/static/video',
        destDir     : destDir + '/static/video',
    }
};

module.exports = config;
