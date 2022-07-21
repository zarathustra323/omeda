const required = [
  {
    Description: 'P1Identity - Log in',
    AlternateId: 'P1I_LOG_IN',
    ActionDescription: 'Log in',
  },
  {
    Description: 'P1Identity - Verify',
    AlternateId: 'P1I_VERIFY',
    ActionDescription: 'Verify',
  },
  {
    Description: 'P1Identity - Update profile',
    AlternateId: 'P1I_UPDATE_PROFILE',
    ActionDescription: 'Submit',
  },
];
const { log } = console;

module.exports = async ({
  apiClient,
}) => {
  log('Loading behaviors and actions...');
  const [
    behaviors,
    actions,
  ] = await Promise.all([
    apiClient.resource('brand').behaviorLookup(),
    apiClient.resource('brand').behaviorActionsLookup(),
  ]);

  const actionMap = new Map([...actions.data.map((action) => [action.Description, action.Id])]);

  // Ensure all required items are present.
  const descriptions = behaviors.data.map((item) => item.Description);
  const operations = [];
  required.forEach(({ Description, AlternateId, ActionDescription }) => {
    if (!descriptions.includes(Description)) {
      const ActionId = actionMap.get(ActionDescription);
      if (!ActionId) throw new Error(`Unable to locate behavior action by description ${ActionDescription} -- was it created?`);
      operations.push(apiClient.post({
        endpoint: 'behavior/*',
        body: { Description, AlternateId, ActionId },
      }));
    }
  });

  await Promise.allSettled(operations);
  log('All required behavior categories are present.');
};
