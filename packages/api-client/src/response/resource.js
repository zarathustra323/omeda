const { get, getAsArray, getAsObject } = require('@parameter1/utils');

class ApiResourceResponse {
  /**
   *
   * @param {object} params
   * @param {object} params.data The formatted response data.
   * @param {ApiClientResponse} params.response The client response.
   */
  constructor({ data, response } = {}) {
    this.data = data;
    this.response = response;
  }

  /**
   * Gets a value, via dot-notation, from the formatted response data.
   *
   * @param {string} path The dot-notated object path.
   * @param {*} def The default value if undefined.
   */
  get(path, def) {
    return get(this.data, path, def);
  }

  /**
   * Gets a value, via dot-notation, from the formatted response data
   * and forces the value to an array.
   *
   * @param {string} path The dot-notated object path.
   */
  getAsArray(path) {
    return getAsArray(this.data, path);
  }

  /**
   * Gets a value, via dot-notation, from the formatted response data
   * and forces the value to an object.
   *
   * @param {string} path The dot-notated object path.
   */
  getAsObject(path) {
    return getAsObject(this.data, path);
  }
}

module.exports = ApiResourceResponse;
