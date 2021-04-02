const { Repo } = require('@parameter1/mongodb/repo');
const Joi = require('@parameter1/joi');
const { validateAsync } = require('@parameter1/joi/utils');

class BrandRepo extends Repo {
  /**
   *
   */
  constructor({
    client,
    dbName,
    demographicRepo,
    deploymentTypeRepo,
    productRepo,
  } = {}) {
    super({
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
   *
   * @param {object} params
   * @param {string} params.brand
   * @param {number} [params.ttl=60*60*24]
   */
  async hasData(params = {}) {
    const { brand, ttl } = await validateAsync(Joi.object({
      brand: Joi.string().lowercase().trim().required(),
      ttl: Joi.number().integer().min(60).default(60 * 60 * 24),
    }).required(), params);
    const date = new Date(Date.now() - (ttl * 1000));
    const query = { _id: brand, updatedAt: { $gte: date } };
    const options = { projection: { _id: 1 } };
    const data = await this.findOne({ query, options });
    return Boolean(data);
  }

  /**
   *
   * @param {object} params
   * @param {string} params.brand The brand abbreviation.
   * @param {object} params.data The data to upsert.
   */
  async upsert(params = {}) {
    const { brand, data } = await validateAsync(Joi.object({
      brand: Joi.string().lowercase().trim().required(),
      data: Joi.object().required(),
    }).required(), params);

    const now = new Date();
    const query = { _id: brand };
    const toUpsert = ['Id', 'Description', 'BrandAbbrev', 'CustomerCount', 'ContactTypes'].reduce((o, key) => ({ ...o, [key]: data[key] }), {});
    const update = {
      $setOnInsert: { ...query, createdAt: now },
      $set: { data: toUpsert, updatedAt: now },
    };
    return Promise.all([
      this.updateOne({ query, update, options: { upsert: true } }),
      this.demographicRepo.upsert({ brand, demographics: data.Demographics }),
      this.deploymentTypeRepo.upsert({ brand, deploymentTypes: data.DeploymentTypes }),
      this.productRepo.upsert({ brand, products: data.Products }),
    ]);
  }
}

module.exports = BrandRepo;
