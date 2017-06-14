// Getting started: http://docs.seleniumhq.org/docs/03_webdriver.jsp
// API details: https://github.com/SeleniumHQ/selenium#selenium


var webdriver = require('selenium-webdriver');
var d = require("./testdriver.js");


d.test(function(driver) {
    driver.get("https://photopon.co/merchants/");
    //driver.findElement(webdriver.By.name('q')).sendKeys('cross browser testing');
    driver.findElement(webdriver.By.name('merchant_login')).click();
    console.log("Clicked on Merchant Login button");


    driver.findElement(webdriver.By.name('login_username')).sendKeys('hayk');
    driver.findElement(webdriver.By.name('login_password')).sendKeys('norisk');
    driver.findElement(webdriver.By.name('login_button')).click();

});
