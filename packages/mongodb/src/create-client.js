const { Logger } = require('@parameter1/mongodb');
const MongoDBClient = require('@parameter1/mongodb/client');
const { name, version } = require('../package.json');

const { log } = console;

module.exports = ({
  url,
  enableQueryLogging,
} = {}) => {
  if (enableQueryLogging) {
    Logger.setLevel('debug');
    Logger.filter('class', ['Cursor']);
    Logger.setCurrentLogger((message, context) => {
      log(context.message);
    });
  }
  return new MongoDBClient({
    url,
    options: { appname: `${name} v${version}` },
  });
};
