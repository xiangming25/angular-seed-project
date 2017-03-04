exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://192.168.2.66:4444/wd/hub',
    specs: ['e2e/route.e2e.js'],
    multiCapabilities: [{
        browserName: 'chrome'
    }]
};
