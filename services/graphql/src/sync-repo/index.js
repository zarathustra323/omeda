const sync = require('./sync');
const upsertBrandData = require('./upsert-brand');

module.exports = ({ apiClient, repos, force = false }) => ({
  brand: () => sync({
    repo: repos.brand,
    force,
    lookupFn: () => apiClient.resource('brand').comprehensiveLookup(),
    upsertFn: upsertBrandData,
  }),
  brandBehavior: () => sync({
    repo: repos.brandBehavior,
    force,
    lookupFn: () => apiClient.resource('brand').behaviorLookup(),
  }),
  brandBehaviorAction: () => sync({
    repo: repos.brandBehaviorAction,
    force,
    lookupFn: () => apiClient.resource('brand').behaviorActionsLookup(),
  }),
  brandBehaviorAttribute: () => sync({
    repo: repos.brandBehaviorAttribute,
    force,
    lookupFn: () => apiClient.resource('brand').behaviorAttributesLookup(),
  }),
  brandBehaviorCategory: () => sync({
    repo: repos.brandBehaviorCategory,
    force,
    lookupFn: () => apiClient.resource('brand').behaviorCategoriesLookup(),
  }),
});
