const Joi = require('@parameter1/joi');
const { validateAsync } = require('@parameter1/joi/utils');
const SyncableRepo = require('./syncable');

class BrandRepo extends SyncableRepo {
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

  /**
   * Overrides Syncable.upsert to upsert to other repos
   *
   * @param {object} params
   * @param {string} params.brand The brand abbreviation.
   * @param {object} params.data The data to upsert.
   */
  async upsert(params = {}) {
    const { data } = await validateAsync(Joi.object({
      data: Joi.object().required(),
    }).required(), params);

    const { brandKey: brand } = this;
    const now = new Date();
    const query = { brand };
    const toUpsert = ['Id', 'Description', 'BrandAbbrev', 'CustomerCount', 'ContactTypes'].reduce((o, key) => ({ ...o, [key]: data[key] }), {});
    const update = {
      $setOnInsert: { ...query, createdAt: now },
      $set: { data: toUpsert, updatedAt: now },
    };
    return Promise.all([
      this.updateOne({ query, update, options: { upsert: true } }),
      this.demographicRepo.upsert({ demographics: data.Demographics }),
      this.deploymentTypeRepo.upsert({ deploymentTypes: data.DeploymentTypes }),
      this.productRepo.upsert({ products: data.Products }),
    ]);
  }
}

module.exports = BrandRepo;
