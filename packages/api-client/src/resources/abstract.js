const Joi = require('@parameter1/joi');

class AbstractResource {
  /**
   *
   * @param {object} params
   * @param {OmedaApiClient} params.client
   */
  constructor({ client } = {}) {
    this.client = client;
    this.schema = {
      behaviorId: Joi.number().integer().min(1),
      customerId: Joi.number().integer().min(1),
      emailAddress: Joi.string().trim().email(),
      encryptedCustomerId: Joi.string().trim().length(15),
      productId: Joi.number().integer().min(1),
    };
  }
}

module.exports = AbstractResource;
