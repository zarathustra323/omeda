const Joi = require('@parameter1/joi');
const { validateAsync } = require('@parameter1/joi/utils');
const OmedaRepo = require('./abstract');

class CustomerRepo extends OmedaRepo {
  /**
   *
   */
  constructor({ brandKey, client, dbName } = {}) {
    super({
      brandKey,
      name: 'customer',
      collectionName: 'customers',
      dbName,
      client,
    });
  }

  /**
   *
   * @param {object} params
   * @param {string} params.id The encrypted ID that was used to _request_ this record
   * @param {object} params.record The customer API record
   */
  async upsertFromEncryptedId(params = {}) {
    const { id, record } = await validateAsync(Joi.object({
      id: Joi.string().trim().required(),
      record: Joi.object().unknown().required(),
    }).required(), params);

    return this.upsert({ id, encrypted: true, record });
  }

  /**
   *
   * @param {object} params
   * @param {number} params.id The customer ID that was used to _request_ this record
   * @param {object} params.record The customer API record
   */
  async upsertFromId(params = {}) {
    const { id, record } = await validateAsync(Joi.object({
      id: Joi.number().required(),
      record: Joi.object().unknown().required(),
    }).required(), params);

    return this.upsert({ id, encrypted: false, record });
  }

  /**
   *
   * @private
   * @param {object} params
   * @param {number|string} params.id The ID that was used to _request_ this record
   * @param {boolean} params.encrypted Whether the requested ID is encrypted
   * @param {object} params.record The customer API record
   */
  async upsert({ id, encrypted = false, record } = {}) {
    const { brandKey: brand } = this;
    const now = new Date();

    const data = Object.keys(record).reduce((o, key) => {
      const value = record[key];
      // skip URL fields.
      if (/^http[s?]:/.test(value)) return o;
      return { ...o, [key]: value };
    }, {});
    const query = { brand, 'data.Id': record.Id };
    const update = {
      $addToSet: { [`requestedIds.${encrypted ? 'encrypted' : 'standard'}`]: id },
      $setOnInsert: { brand, createdAt: now },
      $set: { data, updatedAt: now },
      $inc: { pulls: 1 },
    };
    return this.updateOne({ query, update, options: { upsert: true } });
  }
}

module.exports = CustomerRepo;
