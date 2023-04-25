// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
// process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  // process.env.CHROME_BIN = require('puppeteer').executablePath();
   // config.environment.
   config.set({
     basePath: '',
     frameworks: ['jasmine', '@angular-devkit/build-angular'],
     plugins: [
       require('karma-jasmine'),
       require('karma-chrome-launcher'),
       require('karma-jasmine-html-reporter'),
       require('karma-coverage'),
       require('@angular-devkit/build-angular/plugins/karma'),
     ],
     client: {
       captureConsole: false,
       clearContext: false, // leave Jasmine Spec Runner output visible in browser
       jasmine: {
         random: true
       }
     },

     coverageReporter: {
       dir: require('path').join(__dirname, 'coverage'),
       reporters: [
         // reporters not supporting the `file` property
         { type: 'html'},
         // reporters supporting the `file` property, use `subdir` to directly
         // output them in the `dir` directory
         { type: 'lcovonly' },
         { type: 'text-summary'},
         { type: 'cobertura', file: 'test-results.xml'},
         { type: 'json', file: 'coverage-final.json'}
       ],
       subdir: '.',
       check: {
         global: {
           statements: 70,
           branches: 55,
           lines: 70,
           functions: 70,
         }
       }
     },

     reporters: ['progress','kjhtml'],
     port: 9876,
     colors: true,
     logLevel: config.LOG_INFO,
     autoWatch: true,
     // browsers: ['ChromeHeadless'],
     // browsers: ['PhantomJS'],
     browserDisconnectTimeout: 10000,
     browserDisconnectTolerance: 3,
     browserNoActivityTimeout: 60000,
     // customLaunchers: {
     //   Headless_Chrome: {
     //     base: 'Chrome',
     //     flags: [
     //       '--no-sandbox',
     //       '--disable-gpu',
     //       '--disable-web-security'
     //     ]
     //   }},
     browsers: ['ChromeHeadlessNoSandbox'],
     customLaunchers: {
       ChromeHeadlessNoSandbox: {
         base: 'ChromeHeadless',
         flags: ['--no-sandbox']
       }
     },
     singleRun: false,
     browserNoActivityTimeout: 2000000
   });
 };
 
