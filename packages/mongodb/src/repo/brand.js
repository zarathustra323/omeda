const Joi = require('@parameter1/joi');
const { validateAsync } = require('@parameter1/joi/utils');
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
    emailDeploymentRepo,
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
    this.emailDeploymentRepo = emailDeploymentRepo;
  }

  /**
   * Returns the status of the brand data in the DB.
   * Data is considered fresh when it's still within it's TTL period.
   *
   * @param {object} params
   * @param {number} [params.ttl=60*60*1] The TTL, in seconds. Default one hour
   * @returns {Promise<boolen>}
   */
  async status(params = {}) {
    const { ttl } = await validateAsync(Joi.object({
      ttl: Joi.number().integer().min(60).default(60 * 60 * 1),
    }).required(), params);

    const options = { projection: { _id: 1, updatedAt: 1 } };
    const data = await this.findById({ options });
    const status = { brand: this.brandKey, exists: false, isFresh: false };
    if (!data) return status;
    status.exists = true;
    const date = new Date(Date.now() - (ttl * 1000));
    if (data.updatedAt >= date) status.isFresh = true;
    return status;
  }

  /**
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
