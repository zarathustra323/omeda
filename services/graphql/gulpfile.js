const gulpfile = require('@parameter1/gulp/factory');

gulpfile({
  entry: 'src/index.js',
  watchPaths: ['src/**/*.js', '../../packages/api-client/src/**/*.js'],
});
