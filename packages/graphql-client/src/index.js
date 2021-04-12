const fetch = require('node-fetch');
const { ApolloClient } = require('apollo-client');
const { InMemoryCache } = require('apollo-cache-inmemory');
const { createHttpLink } = require('apollo-link-http');
const { name, version } = require('../package.json');

const defaultConfig = {
  name,
  version,
  connectToDevTools: false,
};

/**
 * Factory for creating a server-side Omeda Apollo GraphQL client.
 *
 * Because Omeda's app and input IDs are secure/sensitive/priviledged, this client
 * should _never_ be used in the browser.
 *
 * @param {object} params
 * @param {string} params.uri The GraphQL URI to connect to.
 * @param {string} params.brandKey The Omeda brand key/identifier.
 * @param {string} params.appId The Omeda API App ID.
 * @param {string} [params.inputId] An optional (default) Omeda API Input ID.
 * @param {object} [params.config={}] Additional config options to set to the client.
 * @param {object} [params.linkConfig={}] Additional config options to set to the link.
 * @returns {ApolloClient}
 */
module.exports = ({
  uri,
  brandKey,
  appId,
  inputId,
  config = {},
  linkConfig = {},
} = {}) => {
  if (!uri) throw new Error('The Omeda GraphQL `uri` is required.');
  if (!brandKey) throw new Error('The Omeda `brandKey` is required.');
  if (!appId) throw new Error('The Omeda `appId` is required.');
  const headers = {
    'x-omeda-brand': brandKey,
    'x-omeda-appid': appId,
    ...(inputId && { 'x-omeda-inputid': inputId }),
  };

  const client = new ApolloClient({
    ...defaultConfig,
    ...config,
    ssrMode: true,
    link: createHttpLink({
      ...linkConfig,
      uri,
      headers,
      fetch,
    }),
    cache: new InMemoryCache(),
  });
  return client;
};
