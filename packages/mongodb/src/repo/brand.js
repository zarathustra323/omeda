const OmedaRepo = require('./abstract');

class BrandRepo extends OmedaRepo {
  /**
   *
   */
  constructor({
    brandKey,
    client,
    dbName,
    demographicRepo,
    deploymentTypeRepo,
    productRepo,
  } = {}) {
    super({
      brandKey,
      name: 'brand',
      collectionName: 'brands',
      dbName,
      client,
    });
    this.demographicRepo = demographicRepo;
    this.deploymentTypeRepo = deploymentTypeRepo;
    this.productRepo = productRepo;
  }
}

module.exports = BrandRepo;
