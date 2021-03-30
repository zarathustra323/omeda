const { get } = require('@parameter1/utils');

class OmedaApiResponseError extends Error {
  /**
   *
   * @param {object} params
   * @param {object} params.json The parsed response JSON body
   * @param {object} params.fetchResponse The Fetch response
   */
  constructor({ json, fetchResponse } = {}) {
    const message = get(json, 'Errors.0.Error', fetchResponse.statusText);
    super(message);
    this.status = fetchResponse.status || 500;
    this.json = json;
    this.fetchResponse = fetchResponse;
  }
}

module.exports = OmedaApiResponseError;
