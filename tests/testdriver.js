
var webdriver = require('selenium-webdriver');

var caps = {
    name : 'You forgot test name',
    build :  '1.0',
    
    browser_api_name : 'Chrome51x64', 
    os_api_name : 'Win7x64-C1', 
    browserName : "chrome",
    
    screen_resolution : '1920x1080',
    record_video : "true",
    record_network : "true",
 
    username : "apple@photopon.com",
    password : "ue4bfe6dffc06e2e"
};
 

var Environments = [
    {
        browser_api_name : 'Safari9', 
        os_api_name : 'Mac10.11', 
        browserName : "safari",
        screen_resolution: "1920x1200"
    }, {
        browser_api_name : 'Chrome51x64', 
        os_api_name : 'Win7x64-C1', 
        browserName : "chrome",
        screen_resolution: "1920x1080"
    }, {
        browser_api_name : 'FF45x64', 
        os_api_name : 'Win7x64-C1', 
        browserName : "firefox",
        screen_resolution: "1920x1080"
    }, {
        browser_api_name : 'MblChrome35', 
        os_api_name : 'GalaxyS5-And44', 
        browserName : "chrome",
        screen_resolution: "1080x1920"
    }, {
        browser_api_name : 'MblSafari9.0', 
        os_api_name : 'iPhone6sPlus-iOS9sim', 
        browserName : "safari",
        screen_resolution: "1242x2208"
    }
];

var cs = "http://hub.crossbrowsertesting.com:80/wd/hub";
 

var dotest = function(name, testcase) {

    for (var i = 0; i < Environments.length; i++) {
        for (var k in Environments[i]) {
            caps[k] = Environments[i][k];
        }

        caps.name = name + " - " + Environments[i].browser_api_name + "/" + Environments[i].os_api_name + "/" + Environments[i].browserName;

        console.log("*** Testing on " + caps.browser_api_name + " " + caps.os_api_name + " " + caps.browserName);
        var driver = new webdriver.Builder()
            .usingServer(cs)
            .withCapabilities(caps)
            .build();

        testcase(caps.name, driver);
        driver.quit();
    }
    

};

module.exports = {
    test: dotest
};






