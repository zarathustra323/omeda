const ApiClientAbstractResponse = require('./-abstract');

class ApiClientTextResponse extends ApiClientAbstractResponse {
  /**
   *
   * @param {object} params
   * @param {object} params.text The parsed response JSON body.
   * @param {object} params.fetchResponse The Fetch response.
   * @param {number} params.time The time (in MS) it took to retrieve the response.
   * @param {boolean} [params.fromCache=false] Whether the JSON was retrieved from cache.
   */
  constructor({
    text,
    fetchResponse,
    time,
    fromCache = false,
  } = {}) {
    super({
      contentType: 'text',
      fetchResponse,
      time,
      fromCache,
    });
    this.text = text;
  }
}

module.exports = ApiClientTextResponse;
