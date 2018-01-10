var path = require('path');

var basePath = './';
var absoluteBasePath = path.resolve(path.join(__dirname, basePath));

module.exports = function(karma) {
  karma.set({

    basePath: basePath,

    frameworks: [
      'browserify',
      'mocha',
      'chai'
    ],

    files: [
      { pattern: 'node_modules/diagram-js/assets/**', watched: false },

      'test/spec/**/*Spec.js'
    ],

    preprocessors: {
      'test/spec/**/*Spec.js': [ 'browserify' ]
    },

    reporters: [ 'spec' ],

    browsers: [ 'PhantomJS' ],

    browserNoActivityTimeout: 30000,

    singleRun: false,

    autoWatch: true,

    browserify: {
     debug: true,
     paths: [ absoluteBasePath ],
     transform: [ [ 'babelify' ] ]
    }

  });
}
