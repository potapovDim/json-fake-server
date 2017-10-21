let chrome = require('selenium-webdriver/chrome');

 let service = new chrome.ServiceBuilder()
     .loggingTo('/my/log/file.txt')
     .enableVerboseLogging()
     .build();

 let options = new chrome.Options();
 // configure browser options ...

 let driver = chrome.Driver.createSession(options, service);