// Getting started: http://docs.seleniumhq.org/docs/03_webdriver.jsp
// API details: https://github.com/SeleniumHQ/selenium#selenium


var webdriver = require('selenium-webdriver');
var d = require("./testdriver.js");


d.test("Login Test", function(fullname, driver) {
    driver.get("https://photopon.co/merchants/");
    //driver.findElement(webdriver.By.name('q')).sendKeys('cross browser testing');
    driver.findElement(webdriver.By.name('merchant_login')).click();
    
    console.log(fullname + ": Clicked on Merchant Login button");

    driver.wait(webdriver.until.elementLocated(webdriver.By.name('login_username')), 5000).then(function() {
        console.log(fullname + ": Got into login screen");
    });

    driver.findElement(webdriver.By.name('login_username')).sendKeys('hayk');
    driver.findElement(webdriver.By.name('login_password')).sendKeys('norisk');
    driver.findElement(webdriver.By.name('login_button')).click();

    driver.wait(webdriver.until.elementLocated(webdriver.By.name('merchant_dashboard_title')), 5000).then(function() {
        console.log(fullname + ": Login successfull");
    });

});
