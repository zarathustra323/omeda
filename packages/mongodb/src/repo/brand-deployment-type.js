const OmedaRepo = require('./abstract');

class BrandDeploymentTypeRepo extends OmedaRepo {
  /**
   *
   */
  constructor({ brandKey, client, dbName } = {}) {
    super({
      brandKey,
      name: 'brand deployment type',
      collectionName: 'brand-deployment-types',
      dbName,
      client,
    });
  }
}

module.exports = BrandDeploymentTypeRepo;
