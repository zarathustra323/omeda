const { createClient } = require('@parameter1/omeda-mongodb');
const { MONGO_URI, isProduction } = require('../env');

module.exports = createClient({
  url: MONGO_URI,
  enableQueryLogging: !isProduction,
});
