const OmedaRepo = require('./abstract');

class ApiRequestRepo extends OmedaRepo {
  /**
   *
   */
  constructor({ brandKey, client, dbName } = {}) {
    super({
      brandKey,
      name: 'api request',
      collectionName: 'api-requests',
      dbName,
      client,
    });
  }
}

module.exports = ApiRequestRepo;
