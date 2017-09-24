// Karma configuration
// Generated on Sun Sep 24 2017 04:17:55 GMT+0530 (India Standard Time)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      './app/libs/angular/angular.js',                             // angular

      './app/libs/angular-mocks/angular-mocks.js',                 // loads our modules for tests
      './app/libs/ngInfiniteScroll/build/ng-infinite-scroll.js',
      './app/libs/angular-ui-grid/ui-grid.min.js',
      './app/libs/angular-ui-select/dist/select.js',
      
      './app/libs/angular-route/angular-route.min.js', // ui-router
      './app/libs/ngstorage/ngStorage.min.js',
      './app/js/appRoutes.js',
      './app/js/controllers/LoginCtrl.js',
      './app/js/services/AuthenticationService.js',
      './app/js/controllers/PatientCtrl.js',
      './app/js/services/PatientService.js',
      
      
      './app/js/app.js',                                                  // our angular app
      
      './app/js/services/AuthenticationService.spec.js',
      './app/js/services/PatientService.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
