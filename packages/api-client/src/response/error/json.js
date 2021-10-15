const { get, getAsArray, getAsObject } = require('@parameter1/utils');
const ApiResponseAbstractError = require('./-abstract');

class ApiResponseJSONError extends ApiResponseAbstractError {
  /**
   *
   * @param {object} params
   * @param {object} params.json The parsed response JSON body
   * @param {object} params.fetchResponse The Fetch response
   * @param {number} params.time The time (in MS) it took to retrieve the response.
   */
  constructor({ json, fetchResponse, time } = {}) {
    super({
      message: get(json, 'Errors.0.Error'),
      fetchResponse,
      time,
      contentType: 'json',
    });
    this.json = json;
  }

  /**
   * Gets a value, via dot-notation, from the parsed JSON response body.
   *
   * @param {string} path The dot-notated object path.
   * @param {*} def The default value if undefined.
   */
  get(path, def) {
    return get(this.json, path, def);
  }

  /**
   * Gets a value, via dot-notation, from the parsed JSON response body
   * and forces the value to an array.
   *
   * @param {string} path The dot-notated object path.
   */
  getAsArray(path) {
    return getAsArray(this.json, path);
  }

  /**
   * Gets a value, via dot-notation, from the parsed JSON response body
   * and forces the value to an object.
   *
   * @param {string} path The dot-notated object path.
   */
  getAsObject(path) {
    return getAsObject(this.json, path);
  }
}

module.exports = ApiResponseJSONError;
