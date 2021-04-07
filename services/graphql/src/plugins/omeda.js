/* eslint-disable class-methods-use-this */
const { UserInputError } = require('apollo-server-express');
const OmedaApiClient = require('@parameter1/omeda-api-client');
const { isFunction: isFn } = require('@parameter1/utils');
const { createRepos } = require('@parameter1/omeda-mongodb');
const mongodb = require('../mongodb');

class OmedaGraphQLPlugin {
  /**
   *
   * @param {object} params
   * @param {function} [params.setContext]
   */
  constructor({ setContext } = {}) {
    this.setContext = setContext;
  }

  /**
   *
   */
  requestDidStart() {
    return {
      didResolveOperation: this.didResolveOperation.bind(this),
    };
  }

  /**
   *
   * @param {object} requestContext
   */
  async didResolveOperation(requestContext) {
    const { context, operation, request } = requestContext;
    const { headers } = request.http;

    // let introspection queries pass through.
    if (this.isIntrospectionQuery(operation)) return;
    const appId = headers.get('x-omeda-appid');
    const inputId = headers.get('x-omeda-inputid');
    const brand = headers.get('x-omeda-brand');
    if (!appId) throw new UserInputError('You must provide an Omeda application ID via the `x-omeda-appid` header.');
    if (!brand) throw new UserInputError('You must provide an Omeda brand via the `x-omeda-brand` header.');

    context.brand = brand;
    context.apiClient = new OmedaApiClient({ appId, brand, inputId });
    context.repos = createRepos({ brandKey: brand, client: mongodb });

    if (isFn(this.setContext)) {
      const contextFromServer = await this.setContext(requestContext);
      // eslint-disable-next-line no-param-reassign
      requestContext.context = { ...contextFromServer, ...context };
    }
  }

  /**
   *
   * @param {object} operation
   */
  isIntrospectionQuery(operation) {
    return operation.selectionSet.selections.every((selection) => {
      const fieldName = selection.name.value;
      return fieldName.startsWith('__');
    });
  }
}

module.exports = OmedaGraphQLPlugin;
