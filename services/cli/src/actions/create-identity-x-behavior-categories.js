const required = ['P1Identity'];
const { log } = console;

module.exports = async ({
  apiClient,
}) => {
  const r = await apiClient.resource('brand').behaviorCategoriesLookup();

  // Ensure all required items are present.
  const descriptions = r.data.map((item) => item.Description);
  const operations = [];
  required.forEach((Description) => {
    if (!descriptions.includes(Description)) {
      operations.push(apiClient.post({ endpoint: 'behavior/category/*', body: { Description } }));
    }
  });

  await Promise.allSettled(operations);

  log('All required behavior categories are present.');
};
