class ApiSetResponse {
  /**
   *
   * @param {object} params
   * @param {array} params.data The response array data.
   * @param {ApiClientResponse} params.response The client response.
   */
  constructor({ data = [], response } = {}) {
    if (!Array.isArray(data)) throw new Error('The response data must be an array.');
    this.data = new Set(data);
    this.response = response;
  }
}

module.exports = ApiSetResponse;
