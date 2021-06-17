const DataLoader = require('dataloader');

module.exports = ({ apiClient } = {}) => {
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
  return {
    customerDemographics: new DataLoader(createCustomerRelLoader({ method: 'lookupDemographics' })),
    customerEmails: new DataLoader(createCustomerRelLoader({ method: 'lookupEmails' })),
    customerExternalIds: new DataLoader(createCustomerRelLoader({ method: 'lookupExternalIds' })),
    customerPhoneNumbers: new DataLoader(createCustomerRelLoader({ method: 'lookupPhoneNumbers' })),
    customerPostalAddresses: new DataLoader(createCustomerRelLoader({ method: 'lookupPostalAddresses' })),
  };
};
