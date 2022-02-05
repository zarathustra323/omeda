const attributes = require('../attributes');

class AbstractResource {
  /**
   *
   * @param {object} params
   * @param {OmedaApiClient} params.client
   */
  constructor({ client } = {}) {
    this.client = client;
    this.schema = attributes;
  }
}

module.exports = AbstractResource;
