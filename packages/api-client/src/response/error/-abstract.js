class ApiResponseAbstractError extends Error {
  /**
   *
   * @param {object} params
   * @param {string} [params.message] The error message. If not set, will use the status text
   *                                  from the fetch response.
   * @param {object} params.fetchResponse The Fetch response
   * @param {number} params.time The time (in MS) it took to retrieve the response.
   * @param {string} params.contentType The content type of the error.
   */
  constructor({
    message,
    fetchResponse,
    time,
    contentType,
  } = {}) {
    super(message || fetchResponse.statusText);
    this.status = fetchResponse.status || 500;
    this.fetchResponse = fetchResponse;
    this.time = time;
    this.contentType = contentType;
  }
}

module.exports = ApiResponseAbstractError;
