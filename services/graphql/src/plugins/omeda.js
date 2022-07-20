/* eslint-disable class-methods-use-this */
const { UserInputError } = require('apollo-server-express');
const OmedaApiClient = require('@parameter1/omeda-api-client');
const { isFunction: isFn } = require('@parameter1/utils');
const { createRepos } = require('@parameter1/omeda-mongodb');
const mongodb = require('../mongodb');
const newrelic = require('../newrelic');
const createLoaders = require('../dataloaders');

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
    const brandData = await repos.brand.status();
    if (!brandData.exists) {
      // save the brand data for the first time.
      const response = await apiClient.resource('brand').comprehensiveLookup();
      await repos.brand.upsert({ data: response.data });
    } else if (!brandData.isFresh || forceSync) {
      // refresh the brand data, but do not await
      (async () => {
        const response = await apiClient.resource('brand').comprehensiveLookup();
        await repos.brand.upsert({ data: response.data });
      })().catch(newrelic.noticeError.bind(newrelic));
    }

    // @todo cleanup
    // keep brand behaviors in-sync.
    const behaviors = await repos.brandBehavior.status();
    if (!behaviors.exists) {
      // save the data for the first time.
      const response = await apiClient.resource('brand').behaviorLookup();
      await repos.brandBehavior.upsert({ behaviors: response.data });
    } else if (!behaviors.isFresh || forceSync) {
      // refresh the data, but do not await
      (async () => {
        const response = await apiClient.resource('brand').behaviorLookup();
        await repos.brandBehavior.upsert({ behaviors: response.data });
      })().catch(newrelic.noticeError.bind(newrelic));
    }

    // @todo cleanup
    // keep brand behavior actions in-sync.
    const behaviorActions = await repos.brandBehaviorAction.status();
    if (!behaviorActions.exists) {
      // save the data for the first time.
      const response = await apiClient.resource('brand').behaviorActionsLookup();
      await repos.brandBehaviorAction.upsert({ actions: response.data });
    } else if (!behaviorActions.isFresh || forceSync) {
      // refresh the data, but do not await
      (async () => {
        const response = await apiClient.resource('brand').behaviorActionsLookup();
        await repos.brandBehaviorAction.upsert({ actions: response.data });
      })().catch(newrelic.noticeError.bind(newrelic));
    }

    // @todo cleanup
    // keep brand behavior categories in-sync.
    const behaviorCategories = await repos.brandBehaviorCategory.status();
    if (!behaviorCategories.exists) {
      // save the data for the first time.
      const response = await apiClient.resource('brand').behaviorCategoriesLookup();
      await repos.brandBehaviorCategory.upsert({ categories: response.data });
    } else if (!behaviorCategories.isFresh || forceSync) {
      // refresh the data, but do not await
      (async () => {
        const response = await apiClient.resource('brand').behaviorCategoriesLookup();
        await repos.brandBehaviorCategory.upsert({ categories: response.data });
      })().catch(newrelic.noticeError.bind(newrelic));
    }

    // @todo cleanup
    // keep brand behavior categories in-sync.
    const behaviorAttributes = await repos.brandBehaviorAttribute.status();
    if (!behaviorAttributes.exists) {
      // save the data for the first time.
      const response = await apiClient.resource('brand').behaviorAttributesLookup();
      await repos.brandBehaviorAttribute.upsert({ attributes: response.data });
    } else if (!behaviorAttributes.isFresh || forceSync) {
      // refresh the data, but do not await
      (async () => {
        const response = await apiClient.resource('brand').behaviorAttributesLookup();
        await repos.brandBehaviorAttribute.upsert({ attributes: response.data });
      })().catch(newrelic.noticeError.bind(newrelic));
    }

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
