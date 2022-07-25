/* eslint-disable class-methods-use-this */
const { UserInputError } = require('apollo-server-express');
const OmedaApiClient = require('@parameter1/omeda-api-client');
const { isFunction: isFn } = require('@parameter1/utils');
const { createRepos } = require('@parameter1/omeda-mongodb');
const mongodb = require('../mongodb');
const newrelic = require('../newrelic');
const createLoaders = require('../dataloaders');
const syncFactory = require('../sync-repo');

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
    let appId = headers.get('x-omeda-appid');
    let inputId = headers.get('x-omeda-inputid');
    let brand = headers.get('x-omeda-brand');
    let clientAbbrev = headers.get('x-omeda-client');
    const forceSync = headers.get('x-omeda-force-sync');
    if (!appId) throw new UserInputError('You must provide an Omeda application ID via the `x-omeda-appid` header.');
    if (!brand) throw new UserInputError('You must provide an Omeda brand via the `x-omeda-brand` header.');

    brand = brand.toLowerCase();
    appId = appId.toUpperCase();
    inputId = inputId ? inputId.toUpperCase() : null;
    clientAbbrev = clientAbbrev ? clientAbbrev.toLowerCase() : null;

    context.brand = brand;

    const apiClient = new OmedaApiClient({
      appId,
      brand,
      clientAbbrev,
      inputId,
    });
    context.apiClient = apiClient;
    const repos = createRepos({ brandKey: brand, client: mongodb });
    context.repos = repos;
    context.loaders = createLoaders({ apiClient, repos });

    this.logRequest({ context, request });

    // keep brand data in-sync.
    const sync = syncFactory({ apiClient, repos, force: forceSync });
    await Promise.all([
      sync.brand(),
      sync.brandBehavior(),
      sync.brandBehaviorAction(),
      sync.brandBehaviorAttribute(),
      sync.brandBehaviorCategory(),
    ]);

    if (isFn(this.setContext)) {
      const contextFromServer = await this.setContext(requestContext);
      // eslint-disable-next-line no-param-reassign
      requestContext.context = { ...contextFromServer, ...context };
    }
  }

  logRequest({ request, context }) {
    const {
      apiClient,
      brand,
      repos,
      req,
    } = context;

    const doc = {
      env: process.env.NODE_ENV,
      date: new Date(),
      brand,
      appId: apiClient.appId,
      clientAbbrev: apiClient.clientAbbrev,
      inputId: apiClient.inputId,
      ip: req.ip,
      ua: req.get('user-agent'),
      headers: req.headers,
      request: {
        query: request.query,
        operationName: request.operationName,
        variables: request.variables,
      },
    };
    repos.apiRequest.insertOne({ doc }).catch(newrelic.noticeError.bind(newrelic));
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
