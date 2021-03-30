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
      customerId: Joi.number().integer().min(1),
      emailAddress: Joi.string().trim().email(),
      productId: Joi.number().integer().min(1),
    };
  }
}

module.exports = AbstractResource;
