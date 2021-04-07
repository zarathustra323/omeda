const Joi = require('@parameter1/joi');
const { validateAsync } = require('@parameter1/joi/utils');
const OmedaRepo = require('./abstract');

class BrandProductRepo extends OmedaRepo {
  /**
   *
   */
  constructor({ brandKey, client, dbName } = {}) {
    super({
      brandKey,
      name: 'brand product',
      collectionName: 'brand-products',
      dbName,
      client,
    });
  }

  /**
   *
   * @param {object} params
   * @param {string} params.brand The brand abbreviation.
   * @param {object[]} params.products The products to upsert.
   */
  async upsert(params = {}) {
    const { products } = await validateAsync(Joi.object({
      products: Joi.array().items(Joi.object().required()).required(),
    }).required(), params);
    if (!products.length) return null;

    const { brandKey: brand } = this;
    const now = new Date();
    const ids = [];
    const operations = products.map((product) => {
      const { Id } = product;
      ids.push(Id);
      const filter = { brand, 'data.Id': Id };
      const update = {
        $setOnInsert: { brand, createdAt: now },
        $set: { data: product, updatedAt: now },
      };
      return { updateOne: { filter, update, upsert: true } };
    });

    // delete any remaining products that weren't included in this dataset
    operations.push({
      deleteMany: { filter: { 'data.Id': { $nin: ids }, brand } },
    });

    return this.bulkWrite({ operations });
  }
}

module.exports = BrandProductRepo;
