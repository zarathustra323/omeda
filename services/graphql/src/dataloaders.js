const DataLoader = require('dataloader');

module.exports = ({ apiClient, repos } = {}) => {
  const createCustomerRelLoader = ({ method }) => async (customerIds) => {
    const resource = apiClient.resource('customer');
    const fn = resource[method].bind(resource);
    const responses = await Promise.all(customerIds.map(async (customerId) => {
      const r = await fn({ customerId, errorOnNotFound: false });
      return r;
    }));
    const map = responses.reduce((m, response) => {
      m.set(response.customerId, response);
      return m;
    }, new Map());
    return customerIds.map((customerId) => map.get(customerId));
  };

  const createRepoLoader = ({ name }) => async (ids) => {
    const repo = repos[name];
    if (!repo) throw new Error(`No MongoDB repo found for ${name}`);
    const cursor = await repo.find({ query: { 'data.Id': { $in: ids } } });
    const docs = await cursor.toArray();
    const map = docs.reduce((m, doc) => {
      m.set(doc.data.Id, doc);
      return m;
    }, new Map());
    return ids.map((id) => map.get(id));
  };

  return {
    brandDemographics: new DataLoader(createRepoLoader({ name: 'brandDemographic' })),
    brandDeploymentTypes: new DataLoader(createRepoLoader({ name: 'brandDeploymentType' })),
    brandProducts: new DataLoader(createRepoLoader({ name: 'brandProduct' })),

    customerDemographics: new DataLoader(createCustomerRelLoader({ method: 'lookupDemographics' })),
    customerEmails: new DataLoader(createCustomerRelLoader({ method: 'lookupEmails' })),
    customerExternalIds: new DataLoader(createCustomerRelLoader({ method: 'lookupExternalIds' })),
    customerPhoneNumbers: new DataLoader(createCustomerRelLoader({ method: 'lookupPhoneNumbers' })),
    customerPostalAddresses: new DataLoader(createCustomerRelLoader({ method: 'lookupPostalAddresses' })),
  };
};
