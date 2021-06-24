const createClient = require('@parameter1/omeda-graphql-client');

/**
 * Express Middleware for creating and using the server-side Omeda GraphQL client.
 *
 * @param {object} params
 * @param {string} params.uri The GraphQL URI to connect to.
 * @param {string} params.brandKey The Omeda brand key/identifier.
 * @param {string} [params.clientKey] The Omeda client key/identifier.
 * @param {string} params.appId The Omeda API App ID.
 * @param {string} [params.inputId] An optional (default) Omeda API Input ID.
 * @param {object} [params.config={}] Additional config options to set to the client.
 * @param {object} [params.linkConfig={}] Additional config options to set to the link.
 * @param {string} [params.prop=$omeda] The `req`/`res.locals` property name to apply the client to.
 * @returns {function} The middleware function
 */
module.exports = ({
  uri,
  brandKey,
  clientKey,
  appId,
  inputId,
  config = {},
  linkConfig = {},
  prop = '$omeda',
} = {}) => (req, res, next) => {
  const client = createClient({
    uri,
    brandKey,
    clientKey,
    appId,
    inputId,
    config,
    linkConfig,
  });
  req[prop] = client;
  res.locals[prop] = client;
  next();
};
