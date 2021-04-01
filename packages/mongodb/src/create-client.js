const MongoDBClient = require('@parameter1/mongodb/client');
const { name, version } = require('../package.json');

module.exports = ({ url } = {}) => new MongoDBClient({
  url,
  options: { appname: `${name} v${version}` },
});
