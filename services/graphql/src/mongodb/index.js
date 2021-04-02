const { createClient } = require('@parameter1/omeda-mongodb');
const { MONGO_URI } = require('../env');

module.exports = createClient({ url: MONGO_URI });
