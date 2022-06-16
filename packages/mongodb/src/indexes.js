module.exports = {
  'api-requests': [
    { brand: 1 },
    [{ date: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 30 }],
  ],
  'brand-demographics': [
    { brand: 1 },
    [{ 'data.Id': 1, brand: 1 }, { unique: true }],
  ],
  'brand-deployment-types': [
    { brand: 1 },
    [{ 'data.Id': 1, brand: 1 }, { unique: true }],
  ],
  'brand-products': [
    { brand: 1 },
    [{ 'data.Id': 1, brand: 1 }, { unique: true }],
    { 'data.DeploymentTypeId': 1, brand: 1 },

    { 'data.Id': 1, _id: 1 },
    { 'data.Description': 1, _id: 1 },
  ],
  brands: [
    [{ brand: 1 }, { unique: true }],
  ],
  customers: [
    { brand: 1 },
    [{ 'data.Id': 1, brand: 1 }, { unique: true }],
  ],
  'email-deployments': [
    { brand: 1 },
    { 'data.DeploymentTypeId': 1, brand: 1 },
    [{ 'data.TrackId': 1, brand: 1 }, { unique: true }],
  ],
};
