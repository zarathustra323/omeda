const required = ['Log in', 'Submit', 'Verify'];
const { log } = console;

module.exports = async ({
  apiClient,
}) => {
  const r = await apiClient.resource('brand').behaviorActionsLookup();

  // Ensure all required items are present.
  const descriptions = r.data.map((item) => item.Description);
  const operations = [];
  required.forEach((Description) => {
    if (!descriptions.includes(Description)) {
      operations.push(apiClient.post({ endpoint: 'behavior/action/*', body: { Description } }));
    }
  });

  await Promise.allSettled(operations);
  log('All required behavior actions are present.');
};
