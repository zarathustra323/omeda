const required = [
  {
    Description: 'P1Identity - Log in',
  },
  {
    Description: 'P1Identity - Verify',
  },
  {
    Description: 'P1Identity - Update profile',
  },
];
const { log } = console;

module.exports = async ({
  apiClient,
  siteKey,
}) => {
  if (siteKey) {
    required.forEach((v, i) => {
      required[i].Description = `${required[i].Description} (${siteKey})`;
    });
  }
  log('Loading behaviors and categories...');
  const [
    behaviors,
    categories,
  ] = await Promise.all([
    apiClient.resource('brand').behaviorLookup(),
    apiClient.resource('brand').behaviorCategoriesLookup(),
  ]);

  const category = categories.data.find((c) => c.Description === 'P1Identity');
  if (!category) throw new Error('Unable to find category P1Identity, was it created?');

  const behaviorMap = new Map([
    ...behaviors.data.map((item) => [item.Description, item]),
  ]);

  // Ensure all required items are present.
  const operations = [];
  required.forEach(({ Description }) => {
    const behavior = behaviorMap.get(Description);
    if (!behavior) throw new Error(`Unable to locate behavior by description ${Description} -- was it created?`);
    operations.push(apiClient.post({
      endpoint: 'behavior/category/assignment/*',
      body: {
        BehaviorId: behavior.Id,
        BehaviorCategoryId: [category.Id],
        Append: true,
      },
    }));
  });

  await Promise.allSettled(operations);
  log('All required behavior categories have been assigned.');
};
