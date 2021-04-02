const indexes = require('./indexes');

module.exports = ({ client, dbName = 'omeda-api-data' } = {}) => client
  .buildIndexesFor({ dbName, obj: indexes, forceBackground: true });
