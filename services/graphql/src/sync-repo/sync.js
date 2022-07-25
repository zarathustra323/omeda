const newrelic = require('../newrelic');
const defaultCheckFn = require('./check');
const defaultUpsertFn = require('./upsert');

module.exports = async ({
  repo,
  lookupFn,
  checkFn = defaultCheckFn,
  upsertFn = defaultUpsertFn,
  force = true,
}) => {
  const data = await checkFn({ repo });
  if (!data.exists) {
    // save the brand data for the first time.
    const response = await lookupFn();
    await upsertFn({ repo, data: response.data });
  } else if (!data.isFresh || force) {
    // refresh the brand data, but do not await
    (async () => {
      const response = await lookupFn();
      await upsertFn({ repo, data: response.data });
    })().catch(newrelic.noticeError.bind(newrelic));
  }
};
