class ApiClientAbstractResponse {
  /**
   *
   * @param {object} params
   * @param {object} params.fetchResponse The Fetch response.
   * @param {string} params.contentType The content type of the response.
   * @param {number} params.time The time (in MS) it took to retrieve the response.
   * @param {boolean} [params.fromCache=false] Whether the JSON was retrieved from cache.
   */
  constructor({
    fetchResponse,
    contentType,
    time,
    fromCache = false,
  } = {}) {
    this.contentType = contentType;
    if (!fromCache) this.fetchResponse = fetchResponse;
    this.time = time;
    this.fromCache = fromCache;
  }

  getBody() {
    return this[this.contentType];
  }
}

module.exports = ApiClientAbstractResponse;
