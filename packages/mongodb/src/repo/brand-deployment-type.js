const Joi = require('@parameter1/joi');
const { validateAsync } = require('@parameter1/joi/utils');
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

  /**
   *
   * @param {object} params
   * @param {string} params.brand The brand abbreviation.
   * @param {object[]} params.deploymentTypes The deployment types to upsert.
   */
  async upsert(params = {}) {
    const { deploymentTypes } = await validateAsync(Joi.object({
      deploymentTypes: Joi.array().items(Joi.object().required()).required(),
    }).required(), params);
    if (!deploymentTypes.length) return null;

    const { brandKey: brand } = this;
    const now = new Date();
    const ids = [];
    const operations = deploymentTypes.map((deploymentType) => {
      const { Id } = deploymentType;
      ids.push(Id);
      const filter = { brand, 'data.Id': Id };
      const update = {
        $setOnInsert: { brand, createdAt: now },
        $set: { data: deploymentType, updatedAt: now },
      };
      return { updateOne: { filter, update, upsert: true } };
    });

    // delete any remaining deployment types that weren't included in this dataset
    operations.push({
      deleteMany: { filter: { 'data.Id': { $nin: ids }, brand } },
    });

    return this.bulkWrite({ operations });
  }
}

module.exports = BrandDeploymentTypeRepo;
