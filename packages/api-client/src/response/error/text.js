const ApiResponseAbstractError = require('./-abstract');

class ApiResponseTextError extends ApiResponseAbstractError {
  /**
   *
   * @param {object} params
   * @param {string} params.text The response body text
   * @param {object} params.fetchResponse The Fetch response
   * @param {number} params.time The time (in MS) it took to retrieve the response.
   */
  constructor({ text, fetchResponse, time }) {
    super({
      message: text,
      fetchResponse,
      time,
      contentType: 'text',
    });
    this.text = text;
  }
}

module.exports = ApiResponseTextError;
