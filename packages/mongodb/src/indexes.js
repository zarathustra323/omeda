module.exports = {
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
};
